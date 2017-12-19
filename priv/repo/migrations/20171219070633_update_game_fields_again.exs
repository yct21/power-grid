defmodule PowerGrid.Repo.Migrations.UpdateGameFieldsAgain do
  use Ecto.Migration

  def change do
    alter table("games") do
      add :status, :string
      add :players, {:array, :map}
    end
  end
end
