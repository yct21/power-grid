defmodule PowerGrid.Schema.Game do
  use Ecto.Schema
  import Ecto.Changeset
  alias PowerGrid.Schema.Player

  @moduledoc """
  Ecto schema of Game
  """

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "games" do
    field :status, :string
    embeds_many :players, Player
    field :actions, {:array, :map}
    field :arbiter_version, :string

    timestamps()
  end

  @doc """
  Changeset for creating a game
  """
  def create_changeset(attrs) do
    %__MODULE__{}
    |> cast(attrs, [:status, :players, :actions, :arbiter_version])
    |> validate_required([:status, :players, :actions, :arbiter_version])
  end
end
