defmodule PowerGrid.Storage.Player do
  use Ecto.Schema

  @moduledoc """
  Defines schema for game players.
  """

  @primary_key {:id, :string, autogenerate: false}
  embedded_schema do
    field :name, :string
    field :color, :string
    field :join_at, :utc_datetime
  end
end
