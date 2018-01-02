defmodule PowerGrid.Lobby.GameMap do
  @moduledoc """
  Game map in lobby
  """

  alias PowerGrid.Lobby.Game
  alias PowerGrid.Schema.Game, as: SchemaGame
  alias PowerGrid.Schema.Player, as: SchemaPlayer

  @doc """
  Create a new GameMap
  """
  def new do
    Map.new()
  end

  def new_game(games, new_game) do
    Map.put_new(games, new_game.id, new_game)
  end
end
