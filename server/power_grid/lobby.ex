defmodule PowerGrid.Lobby do
  use GenServer
  alias Phoenix.PubSub
  alias PowerGrid.Storage.Game
  alias PowerGrid.Storage.Player

  @moduledoc """
  This module keeps track of game list and online number.

  - when application starts, it starts all alive games
  - it starts a registry for game server
  - it listens to status change of games
  - it sends its list to user entering lobby

  state: {online_num, games}
  """

  ### client ###

  @doc false
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  @doc """
  User joins lobby channel:

  - subscribe the lobby topic
  - tell lobby to update its online_num and send the user initial data
  """
  def user_join(channel_pid) do
    PubSub.subscribe(:power_grid, "lobby")
    GenServer.cast(__MODULE__, {:user_join, channel_pid})
  end

  @doc """
  User leaves lobby channel
  """
  def user_leave() do
    GenServer.cast(__MODULE__, :user_leave)
  end

  @doc """
  Create a new game

  - insert into Repo
  - start link a new Game.Server
  - put its pid into game_list
  """
  def create_game(game) do
    GenServer.cast(__MODULE__, {:create_game, game})
  end

  ### server ###

  def init(_) do
    initial_state = {
      0, # online_num
      Map.new() # games
    }

    {:ok, initial_state}
  end

  # def handle_call({:create_game, {player_id, player_name, color}}, _from, game_list) do
  #   game_owner = %Player{
  #     id: player_id,
  #     name: player_name,
  #     color: color,
  #     join_at: DateTime.utc_now()
  #   }
  #   game = %Game{
  #     status: "waiting",
  #     players: [game_owner],
  #     actions: [],
  #     arbiter_version: "0.0.0",
  #   }
  #   PowerGrid.Repo.insert!(game)
  #   pid = PowerGrid.Game.Supervisor.start_child(game)
  #   updated_game_list = Map.put game_list, game.id, pid

  #   {:reply, :ok, updated_game_list}
  # end

  def handle_cast({:user_join, channel_pid}, {online_num, games}) do
    updated_online_num = online_num + 1

    send(channel_pid, {:after_join, updated_online_num, games})
    broadcast!("onlineNum:update", %{"onlineNum" => updated_online_num})

    {:noreply, {updated_online_num, games}}
  end

  def handle_cast(:user_leave, {online_num, games}) do
    broadcast!("onlineNum:update", %{"onlineNum" => online_num - 1})
    {:noreply, {online_num - 1, games}}
  end

  ### helpers ###

  defp broadcast!(event, message) do
    PowerGridWeb.Endpoint.broadcast!("lobby", event, message)
  end
end
