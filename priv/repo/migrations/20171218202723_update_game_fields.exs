defmodule PowerGrid.Repo.Migrations.UpdateGameFields do
  use Ecto.Migration

  def change do
    alter table("games") do
      add :arbiter_version, :string
    end
  end
end
