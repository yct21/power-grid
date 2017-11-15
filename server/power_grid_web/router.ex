defmodule PowerGridWeb.Router do
  use PowerGridWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PowerGridWeb do
    pipe_through :api
  end
end
