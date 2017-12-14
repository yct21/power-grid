defmodule PowerGrid.OnlineNum do
  use Agent

  @moduledoc """
  Agent that store the online number of users.
  """

  def start_link() do
    Agent.start_link(fn -> 0 end, name: __MODULE__)
  end

  @doc "Get online number"
  def get do
    Agent.get(__MODULE__, &(&1))
  end

  @doc "Get and update"
  def get_and_update(fun) do
    Agent.get_and_update(__MODULE__, fun)
  end
end
