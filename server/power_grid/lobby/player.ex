defmodule PowerGrid.Lobby.Player do
  @moduledoc """
  Player struct in lobby
  """

  alias __MODULE__, as: Player

  defstruct [:id, :name, :color, :join_at]
end
