defmodule PowerGrid.Lobby.OnlineNum do
  @moduledoc """
  Online number in lobby
  """

  alias __MODULE__, as: OnlineNum

  defstruct [:count]

  def new do
    %OnlineNum{count: 0}
  end

  def increase(%OnlineNum{count: count}) do
    %OnlineNum{count: count+1}
  end

  def decrease(%OnlineNum{count: count}) do
    %OnlineNum{count: count-1}
  end
end
