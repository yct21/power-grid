defmodule PowerGrid.Lobby do
  use GenServer
  alias PowerGrid.Storage.Game
  alias PowerGrid.Storage.Player

  @moduledoc """
  This module keeps track of game list and online number.

  - when application starts, it starts all alive games
  - it starts a registry for game server
  - it listens to status change of games
  - it sends its list to user entering lobby
  """

  ### client ###

  @doc false
  def start_link() do
    GenServer.start_link(__MODULE__, [])
  end

  @doc """
  Get status of all games.
  """
  def get() do

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

  ### server ###

  def init() do
    {:ok, %{}}
  end

  @doc "Get all {game_id, pid} in registry"
  def handle_call(:all, game_list) do
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
