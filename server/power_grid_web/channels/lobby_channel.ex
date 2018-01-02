defmodule PowerGridWeb.LobbyChannel do
  @moduledoc """
  Channel for users in lobby.

  - refresh online number
  - refresh game list
  """

  use PowerGridWeb, :channel
  import ShorterMaps
  alias PowerGrid.Lobby

  def join("lobby", _params, socket) do
    Lobby.enter(self())

    {:ok, socket}
  end

  def handle_in("game:create", %{"userName" => player_name, "color" => color}, socket) do
    :ok = Lobby.create_game(socket.assigns[:user_id], player_name, color)

    {:reply, :ok, socket}
  end

  @doc """
  Send initialize data to user
  """
  def handle_info({:initialize_client, data}, socket) do
    push(socket, "initialize", data)
    {:noreply, socket}
  end

  @doc """
  When user socket lost connect for whatever reason
  """
  def terminate(_message, _socket) do
    Lobby.leave()
  end
end
