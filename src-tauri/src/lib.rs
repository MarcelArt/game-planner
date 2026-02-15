use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_games_table",
            sql: "CREATE TABLE games (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                picture TEXT
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_items_table",
            sql: "CREATE TABLE items (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                picture TEXT,
                game_id TEXT NOT NULL,
                FOREIGN KEY (game_id) REFERENCES games(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_recipes_table",
            sql: "CREATE TABLE recipes (
                id TEXT PRIMARY KEY,
                output_amount REAL NOT NULL,
                item_id TEXT NOT NULL,
                FOREIGN KEY (item_id) REFERENCES items(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_recipe_details_table",
            sql: "CREATE TABLE recipe_details (
                id TEXT PRIMARY KEY,
                input_amount REAL NOT NULL,
                recipe_id TEXT NOT NULL,
                item_id TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                FOREIGN KEY (item_id) REFERENCES items(id)
                    ON DELETE RESTRICT
                    ON UPDATE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "create_inventories_table",
            sql: "CREATE TABLE inventories (
                id TEXT PRIMARY KEY,
                amount REAL NOT NULL DEFAULT 0,
                item_id TEXT NOT NULL UNIQUE,
                FOREIGN KEY (item_id) REFERENCES items(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create_plans_table",
            sql: "CREATE TABLE plans (
                id TEXT PRIMARY KEY,
                goal REAL NOT NULL CHECK (goal > 0),
                item_id TEXT NOT NULL,
                FOREIGN KEY (item_id) REFERENCES items(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations("sqlite:game-planner.db", migrations)
                .build()
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
