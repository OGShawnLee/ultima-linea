module default {
  scalar type Region extending enum<LOCAL, STATAL, NATIONAL, INTERNATIONAL>;

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
    caption: Caption {
      on source delete delete target;
    };
    region: Region;
    required created_at: datetime {
      readonly := true;
      rewrite insert using (datetime_of_statement());
      default := datetime_of_statement();
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
    article: News {
      on target delete allow;
    };
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
    can_be_published: bool {
      rewrite insert, update using (
        select exists .summary and len(.summary) >= 64
          and exists .content and len(.content) >= 512
          and exists .text and len(.text) >= 512
          and exists .image
          and exists .caption
          and exists .region 
      );
    };

    constraint exclusive on (.clean_title);
  }

  type News extending Record {
    overloaded required summary: str {
      constraint min_len_value(64);
      constraint max_len_value(256);
    }
    overloaded required content: str {
      constraint min_len_value(512);
      constraint max_len_value(8192);
    }
    overloaded required text: str {
      constraint min_len_value(512);
      constraint max_len_value(8192);
    }
    overloaded required image: Image {
      constraint exclusive;
    }
    overloaded required caption: Caption {
      constraint exclusive;
    }
    overloaded required region: Region;

    constraint exclusive on (.clean_title);
  }
}
