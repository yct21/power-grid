defmodule PowerGrid.Game.List do
  use GenServer
  alias PowerGrid.Game

  @moduledoc """
  GenServer that contains all the games.
  """

  # api

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  # callbacks

  def init(_) do
    {:ok, %{}}
  end

  def handle_info(:after_init) do
    initial_games = PowerGrid.Repo.all(Game)
    Enum.reduce initial_games, %{}, fn (game, game_list) ->
      pid = PowerGrid.Game.Supervisor.start_child(game)
      Map.put game_list, game.id, pid
    end
  end
end
