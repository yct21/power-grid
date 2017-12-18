defmodule PowerGrid.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias PowerGrid.Game

  @moduledoc """
  Ecto schema of Game
  """

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "games" do
    field :actions, {:array, :map}
    field :arbiter_version, :string

    timestamps()
  end

  @doc false
  def changeset(%Game{} = game, attrs) do
    game
    |> cast(attrs, [:id, :actions])
    |> validate_required([:id, :actions])
  end
end
