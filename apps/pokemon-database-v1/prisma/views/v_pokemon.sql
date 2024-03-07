-- CREATE VIEW v_pokemon as
SELECT
  t_crawler_pokemon.id,
  t_crawler_pokemon_species_names.name,
  t_crawler_pokemon_types.type_1,
  t_crawler_pokemon_types.type_2,
  t_crawler_pokemon_species_genera.genus,
  concat(right(concat('000', convert(t_crawler_pokemon.id, char)), 3), '.png') as `image`
FROM
  t_crawler_pokemon
left join
(
  select
    t_crawler_pokemon_species_names.id,
    t_crawler_pokemon_species_names.name
  from
    t_crawler_pokemon_species_names
  where
    t_crawler_pokemon_species_names.language = 'ja-Hrkt'
) as `t_crawler_pokemon_species_names`
on
  t_crawler_pokemon_species_names.id = t_crawler_pokemon.id
left join
(
  select
    tmp.id,
    max(tmp.type_1) as `type_1`,
    max(tmp.type_2) as `type_2`
  from
  (
    select
      t_crawler_pokemon_types.id,
      case
        when t_crawler_pokemon_types.row_no = 1 then t_crawler_pokemon_types.type
        else null
      end as `type_1`,
      case
        when t_crawler_pokemon_types.row_no = 2 then t_crawler_pokemon_types.type
        else null
      end as `type_2`
    from
      t_crawler_pokemon_types
  ) as `tmp`
  group by
    tmp.id
) as `t_crawler_pokemon_types`
on
  t_crawler_pokemon_types.id = t_crawler_pokemon.id
left join
(
  select
    t_crawler_pokemon_species_genera.id,
    t_crawler_pokemon_species_genera.genus
  from
    t_crawler_pokemon_species_genera
  where
    t_crawler_pokemon_species_genera.language = 'ja-Hrkt'
) as `t_crawler_pokemon_species_genera`
on
  t_crawler_pokemon_species_genera.id = t_crawler_pokemon.id
order by
  t_crawler_pokemon.id
;
