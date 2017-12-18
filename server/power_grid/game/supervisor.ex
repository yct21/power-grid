defmodule PowerGrid.Game.Supervisor do
  use Supervisor

  @moduledoc """
  Supervisor for game server and clients
  """

  # api

  @doc false
  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  @doc false
  def start_child(game) do
    Supervisor.start_child(__MODULE__, [game])
  end

  # callbacks

  @doc false
  def init(_) do
    supervise(
      [worker(PowerGrid.Game.Server, [])],
      strategy: :simple_one_for_one,
    )
  end
end
