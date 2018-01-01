defmodule PowerGrid.Task.LoadGames do
  @moduledoc """
  Load games when application starts.
  """

  use Task
  alias PowerGrid.GameServer
  alias PowerGrid.Schema.Game, as: GameSchema

  def start_link (_)do
    Task.start_link(__MODULE__, &__MODULE__.run/0, [])
  end

  def run do
    # TODO: filter games
    initial_games = PowerGrid.Repo.all(PowerGrid.Storage.Game)
    Enum.each initial_games, fn (game) ->
      "test"
      # GameServer.start(game)
    end
  end
end
