module default {
  type User {
    required name: str {
      constraint min_len_value(8);
      constraint max_len_value(64);
    }
    required display_name: str {
      constraint exclusive;
      constraint min_len_value(4);
      constraint max_len_value(16);
    }
    required email: str {
      constraint exclusive;
      constraint max_len_value(64);
    }
    required encrypted_password: str {
      constraint min_len_value(8);
      constraint max_len_value(64);
    }
    required created_at: datetime {
      readonly := true;
      rewrite insert using (datetime_of_statement());
      default := datetime_of_statement();
    }
  }

  type Image {
    required image_key: str {
      readonly := true;
      constraint exclusive;
    }
    required image_url: str {
      readonly := true;
      constraint exclusive;
    }
    required created_at: datetime {
      readonly := true;
      rewrite insert using (datetime_of_statement());
      default := datetime_of_statement();
    }
  }

  type Caption {
    required image_src: str {
      constraint min_len_value(3);
      constraint max_len_value(64);
    }
    required image_label: str {
      constraint min_len_value(6);
      constraint max_len_value(512);
    }
    required created_at: datetime {
      readonly := true;
      rewrite insert using (datetime_of_statement());
      default := datetime_of_statement();
    }
    required updated_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (
        std::datetime_of_statement()
        if <json>__subject__ {*} != <json>__old__ {*}
        else __old__.updated_at
      );
      default := datetime_of_statement();
    }
  }

  type Record {
    required user: User;
    required title: str {
      constraint min_len_value(32);
      constraint max_len_value(256);
    }
    clean_title := str_trim(str_lower(.title));
    content: str;
    summary: str;
    text: str;
    image: Image;
    caption: Caption;
    required created_at: datetime {
      readonly := true;
      rewrite insert using (datetime_of_statement());
      default := datetime_of_statement();
    }

    index fts::index on ((
      fts::with_options(
        .title,
        language := fts::Language.spa,
        weight_category := fts::Weight.A,
      ),
      fts::with_options(
        .summary,
        language := fts::Language.spa,
        weight_category := fts::Weight.B,
      ),
      fts::with_options(
        .text,
        language := fts::Language.spa,
        weight_category := fts::Weight.B,
      )
    ));
  }

  type Draft extending Record {
    overloaded summary: str {
      constraint max_len_value(256);
    }
    overloaded content: str {
      constraint max_len_value(8192);
    }
    overloaded text: str {
      constraint max_len_value(8192);
    }
    overloaded image: Image {
      constraint exclusive;
    }
    overloaded caption: Caption {
      constraint exclusive;
    }
    required updated_at: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (
        std::datetime_of_statement()
        if 
          (__specified__.updated_at and __subject__.updated_at > __old__.updated_at) 
          or <json>__subject__ {*} != <json>__old__ {*}
        else __old__.updated_at
      );
      default := datetime_of_statement();
    }

    constraint exclusive on (.clean_title);
  }
}
