defmodule PowerGrid.Game do
  @moduledoc """
  A `Game` is the primary data structure used to keep track of PowerGrid concerns.
  """

  alias PowerGrid.Schema.Game, as: SchemaGame

  defstruct [:id, :map, :players, :status, :actions, :arbiter_version]

  @doc """
  Create a game with game schema
  """
  def create(%SchemaGame{} = game) do

  end
end
