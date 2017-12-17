defmodule PowerGridWeb.MainMenuChannel do
  use PowerGridWeb, :channel
  @moduledoc """
  Channel for users in main menu.

  - refresh online number
  - refresh game list
  """

  @online_number_agent PowerGrid.OnlineNum

  def join("MainMenu", _params, socket) do
    @online_number_agent.join
    send(self(), :after_join)

    {:ok, socket}
  end

  @doc """
  send initialize data to user
  """
  def handle_info(:after_join, socket) do
    push socket, "initialize", %{
      "onlineNum" => @online_number_agent.get(),
      "gameList" => %{},
    }

    {:noreply, socket}
  end

  def terminate(_message, _socket) do
    @online_number_agent.leave
  end

end
