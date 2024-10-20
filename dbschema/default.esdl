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
}
