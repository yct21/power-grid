defmodule PowerGridWeb.MainMenuChannel do
  use PowerGridWeb, :channel
  @moduledoc """
  Channel for users in main menu.

  - refresh online number
  - refresh game list
  """

  def join("MainMenu", _params, socket) do
    update_online_num(&(&1 + 1))

    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push socket, "initialize", %{
      "onlineNum" => PowerGrid.OnlineNum.get(),
      "gameList" => [],
    }

    {:noreply, socket}
  end

  def handle_info({:update_online_num, number}, socket) do
    broadcast! socket, "updateOnlineNum", %{"onlineNum" => number}

    {:noreply, socket}
  end

  defp update_online_num(fun) do
    online_num_fun = fn origin_number ->
      updated_number = fun.(origin_number)

      {updated_number, updated_number}
    end

    number = PowerGrid.OnlineNum.get_and_update(online_num_fun)
    send(self(), {:update_online_num, number})
  end
end
