defmodule PowerGrid.Game do
  @moduledoc """
  Module for a game board.

  - status: [:waiting, :running, :ended]
  - players: [PowerGrid.Game.Player]
  """

  defstruct [:status, :players, :board_state]
end
