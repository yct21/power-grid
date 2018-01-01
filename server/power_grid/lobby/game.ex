defmodule PowerGrid.Lobby.Game do
  @moduledoc """
  Game struct in lobby
  """

  alias __MODULE__, as: LobbyGame
  alias PowerGrid.Schema.Game, as: SchemaGame

  defstruct [:id, :status, :players]

  def from_schema(%SchemaGame{} = game) do
    %LobbyGame{
      id: game.id,
      status: game.status,
      players: game.players,
    }
  end
end
