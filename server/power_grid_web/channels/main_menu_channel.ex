defmodule PowerGridWeb.MainMenuChannel do
  import ShorterMaps
  use PowerGridWeb, :channel
  alias PowerGrid.Game
  alias PowerGrid.Game.Player

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

  def handle_in("game:create", %{"userName" => player_name, "color" => color}, socket) do
    PowerGrid.Game.List.create_game({socket.assigns[:user_id], player_name, color})

    {:reply, :ok, socket}
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
