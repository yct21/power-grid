defmodule PowerGrid.OnlineNum do
  use Agent

  @moduledoc """
  - stores the online number of users
  - notify users in main menu
  """

  @update_online_num_message "update:onlineNum"
  @main_menu_channel "MainMenu"

  def start_link() do
    Agent.start_link(fn -> 0 end, name: __MODULE__)
  end

  @doc "get online number"
  def get() do
    Agent.get(__MODULE__, &(&1))
  end

  @doc "An user opens a channel"
  def join() do
    Agent.get_and_update(__MODULE__, &({&1 + 1, &1 + 1}))
    broadcast()
  end

  @doc "An user leaves a channel"
  def leave() do
    Agent.get_and_update(__MODULE__, &({&1 - 1, &1 - 1}))
    broadcast()
  end

  defp broadcast() do
    online_num = get()

    PowerGridWeb.Endpoint.broadcast!(
      @main_menu_channel,
      @update_online_num_message,
      %{"onlineNum" => online_num}
    )
  end
end
