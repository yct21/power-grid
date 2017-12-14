defmodule PowerGrid.Redis.PubSub do
  use GenServer
  @moduledoc """
  Wraps redis pubsub operations to communicate with Game logic part.
  """

  @pool_size 5

  @doc """
  Pool size of both Redix and Redix_PubSub
  """
  def pool_size, do: @pool_size

  def start_pubsub do
    Redix.PubSub.subscribe(:"redix_pubsub_4", "power_grid", __MODULE__)
    Redix.command!(:"redix_client_4", ~w(PUBLISH power_grid ping))
  end

  def start_link() do
    GenServer.start_link __MODULE__, [], name: __MODULE__
  end

  def init(_args) do
    {:ok, nil}
  end

  def handle_info({:redix_pubsub, pubsub, :subscribed, %{channel: power_grid}}, _) do
    {:noreply, {}}
  end

  def handle_info({:redix_pubsub, pubsub, :message, %{channel: power_grid, payload: payload}}, _) do
    if payload === "pong" do
      Redix.command!(:"redix_client_4", ~w(PUBLISH power_grid ping))
    end

    {:noreply, {}}
  end

  defp random_index() do
    rem(System.unique_integer([:positive]), @pool_size)
  end
end
