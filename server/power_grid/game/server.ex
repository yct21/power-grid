defmodule PowerGrid.Game.Server do
  use GenServer
  alias PowerGrid.Game

  @moduledoc """
  GenServer to contain all the servers.
  """

  # api

  @doc false
  def start_link(game) do
    GenServer.start_link(__MODULE__, [game], name: __MODULE__)
  end

  # callbacks
  def init(%Game{} = game) do
    {:ok, game}
  end
end
