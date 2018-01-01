defmodule PowerGrid.Lobby.GameMap do
  @moduledoc """
  Game map in lobby
  """

  alias PowerGrid.Lobby.Game, as: LobbyGame
  alias PowerGrid.Schema.Game, as: SchemaGame
  alias PowerGrid.Schema.Player, as: SchemaPlayer

  @doc """
  Create a new GameMap
  """
  def new do
    Map.new()
  end

  def insert_game(%SchemaGame{} = schema_game, games) when is_map(games) do
    game = LobbyGame.from_schema(schema_game)
    Map.put_new(games, game.id, game)
  end
end
