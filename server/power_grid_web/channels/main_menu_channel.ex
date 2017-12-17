defmodule PowerGridWeb.MainMenuChannel do
  use PowerGridWeb, :channel
  @moduledoc """
  Channel for users in main menu.

  - refresh online number
  - refresh game list
  """

  @online_number_agent PowerGrid.OnlineNum
  @update_online_num_message "update:onlineNum"

  def join("MainMenu", _params, socket) do
    send(self(), :after_join)

    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    update_online_num(&(&1 + 1), socket)

    push socket, "initialize", %{
      "onlineNum" => @online_number_agent.get(),
      "gameList" => %{},
    }

    {:noreply, socket}
  end

  def terminate(_message, socket) do
    update_online_num(&(&1 - 1), socket)
  end

  defp update_online_num(fun, socket) do
    online_num = update_online_num_server(fun)
    update_online_num_client(online_num, socket)
  end

  defp update_online_num_server(fun) do
    online_num_fun = fn origin_number ->
      updated_number = fun.(origin_number)

      {updated_number, updated_number}
    end

    @online_number_agent.get_and_update(online_num_fun)
  end

  defp update_online_num_client(number, socket) do
    broadcast_from! socket, @update_online_num_message, %{"onlineNum" => number}
  end
end
