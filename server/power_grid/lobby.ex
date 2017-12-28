defmodule PowerGrid.Lobby do
  use GenServer
  import ShorterMaps
  alias PowerGrid.Lobby.Server

  @moduledoc """
  This module keeps track of game list and online number.

  - when application starts, it starts all alive games
  - it starts a registry for game server
  - it listens to status change of games
  - it sends its list to user entering lobby

  state: {online_num, games}
  """

  @doc """
  Starts Lobby GenServer
  """
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_) do
    initial_state = %{
      online_num: 0,
      games: Map.new(),
    }

    {:ok, initial_state}
  end

  @doc """
  User joins lobby channel:

  - subscribe the lobby topic
  - tell lobby to update its online_num and send the user initial data
  """
  def enter_lobby(channel_pid) do
    GenServer.cast(__MODULE__, {:enter_lobby, channel_pid})
  end

  def handle_cast({:enter_lobby, channel_pid}, state) do
    updated_state = Map.update!(state, :online_num, &(&1 + 1))

    send(channel_pid, {:after_join, updated_state})
    broadcast!("onlineNum:update", %{"onlineNum" => updated_state.online_num})

    {:noreply, updated_state}
  end

  @doc """
  User leaves lobby channel
  """
  def leave_lobby() do
    GenServer.cast(__MODULE__, :leave_lobby)
  end

  def handle_cast(:leave_lobby, state) do
    updated_state = Map.update!(state, :online_num, &(&1 - 1))

    broadcast!("onlineNum:update", %{"onlineNum" => updated_state.online_num})
    {:noreply, updated_state}
  end

  @doc """
  Create a new game

  - insert into Repo
  - start link a new Game.Server
  - put its pid into game_list
  """
  def create_game(player_id, player_name, player_color) do
    GenServer.cast(__MODULE__, {:create_game, player_id, player_name, player_color})
  end

  ### helpers ###

  defp broadcast!(event, message) do
    PowerGridWeb.Endpoint.broadcast!("lobby", event, message)
  end
end
