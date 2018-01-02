defmodule PowerGrid.Lobby.Game do
  @moduledoc """
  Game struct in lobby
  """

  alias __MODULE__, as: Game
  alias PowerGrid.Schema.Game, as: SchemaGame
  alias PowerGrid.Lobby.Player, as: Player

  defstruct [:id, :status, :map, :players]

  @default_map :germany

  def new(owner_id, owner_name, owner_color) do
    owner_player = %Player{
      id: owner_id,
      name: owner_name,
      color: owner_color,
    }

    %Game{
      id: UUID.uuid4(),
      status: :waiting,
      map: @default_map,
      players: [owner_player],
    }
  end

  # FIXME: from real schema
  def from_schema(%SchemaGame{} = game) do
    %Game{
      id: game.id,
      status: game.status,
      players: game.players,
    }
  end
end
