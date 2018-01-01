defmodule PowerGrid.Lobby.Server do
  @moduledoc """
  GenServer that keeps track of game list and online number for client.
  """

  use GenServer
  import ShorterMaps
  alias PowerGrid.Schema.Game, as: SchemaGame
  alias PowerGrid.Schema.Player, as: SchemaPlayer
  alias PowerGrid.Repo
  alias PowerGrid.GameServer
  alias PowerGrid.Lobby.State, as: LobbyState

  @update_online_num_event "onlineNum:update"

  def init(_) do
    {:ok, LobbyState.new()}
  end

  def handle_cast({:enter, channel_pid}, %LobbyState{} = state) do
    updated_state = LobbyState.enter_lobby(state)
    intialize_client(channel_pid, updated_state)
    broadcast_online_num(updated_state.online_num.count)

    {:noreply, updated_state}
  end

  def handle_cast(:leave, %LobbyState{} = state) do
    updated_state = LobbyState.leave_lobby(state)
    broadcast_online_num(updated_state.online_num.count)

    {:noreply, updated_state}
  end

  def handle_call(
    {:create_game, player_id, player_name, player_color},
    %LobbyState{} = state) do
    game = insert_game_to_repo(player_id, player_name, player_color)
    updated_state = LobbyState.create_game(game, state)

    # TODO: broadcast to lobby channel

    {:reply, :ok, updated_state}
  end

  ### helpers ###

  defp broadcast!(event, message) do
    PowerGridWeb.Endpoint.broadcast!("lobby", event, message)
  end

  defp broadcast_online_num(online_num) do
    broadcast!(@update_online_num_event, %{"onlineNum" => online_num})
  end

  defp intialize_client(channel_pid, %LobbyState{} = state) do
    send(channel_pid, {:initialize_client, %{
      "onlineNum" => state.online_num.count,
      "games" => state.games,
    }})
  end

  defp insert_game_to_repo(player_id, player_name, player_color) do
    game_owner = %SchemaPlayer{
      id: player_id,
      name: player_name,
      color: player_color,
      join_at: DateTime.utc_now()
    }

    game_attr = %{
      status: "waiting",
      players: [game_owner],
      actions: [],
      arbiter_version: "0.0.0",
    }

    changeset = SchemaGame.create_changeset(game_attr)
    PowerGrid.Repo.insert!(changeset)
  end
end
