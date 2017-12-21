defmodule PowerGrid.Game.Registry do
  use GenServer
  alias PowerGrid.Game
  alias PowerGrid.Game.Player

  @moduledoc """
  GenServer that contains maps of games server and its pid.
  """

  # api

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def get do
    GenServer.call(__MODULE__, :get_all)
  end

  @doc """
  Create a new game

  - insert into Repo
  - start link a new Game.Server
  - put its pid into game_list
  """
  def create_game(game) do
    GenServer.call(__MODULE__, {:create_game, game})
  end

  # callbacks

  def init(_) do
    {:ok, %{}}
  end

  def handle_info(:after_init) do
    initial_games = PowerGrid.Repo.all(Game)
    game_list = Enum.reduce initial_games, %{}, fn (game, game_list) ->
      pid = PowerGrid.Game.Supervisor.start_child(game)
      Map.put game_list, game.id, pid
    end

    {:noreply, game_list}
  end

  def handle_call(:get_all, game_list) do
    {:reply, game_list, game_list}
  end

  def handle_call({:create_game, {player_id, player_name, color}}, _from, game_list) do
    game_owner = %Player{
      id: player_id,
      name: player_name,
      color: color,
      join_at: DateTime.utc_now()
    }
    game = %Game{
      status: "waiting",
      players: [game_owner],
      actions: [],
      arbiter_version: "0.0.0",
    }
    PowerGrid.Repo.insert!(game)
    pid = PowerGrid.Game.Supervisor.start_child(game)
    updated_game_list = Map.put game_list, game.id, pid

    {:reply, :ok, updated_game_list}
  end
end
