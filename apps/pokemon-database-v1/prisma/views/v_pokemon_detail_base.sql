-- create view v_pokemon_detail_base as
select
  t_crawler_pokemon.id,
  t_crawler_pokemon.name,
  t_crawler_pokemon.base_experience,
  t_crawler_pokemon.height,
  t_crawler_pokemon.weight,
  t_crawler_pokemon.is_default,
  t_crawler_pokemon.order,
  t_crawler_pokemon_species.base_happiness,
  t_crawler_pokemon_species.capture_rate,
  t_crawler_pokemon_species.color,
  t_crawler_pokemon_species.evolution_chain,
  t_crawler_pokemon_species.evolves_from_species,
  t_crawler_pokemon_species.forms_switchable,
  t_crawler_pokemon_species.gender_rate,
  t_crawler_pokemon_species.generation,
  t_crawler_pokemon_species.growth_rate,
  t_crawler_pokemon_species.habitat,
  t_crawler_pokemon_species.has_gender_differences,
  t_crawler_pokemon_species.hatch_counter,
  t_crawler_pokemon_species.is_baby,
  t_crawler_pokemon_species.is_legendary,
  t_crawler_pokemon_species.is_mythical,
  t_crawler_pokemon_species.shape
from
  t_crawler_pokemon
left join
  t_crawler_pokemon_species
on
  t_crawler_pokemon_species.id = t_crawler_pokemon.id
order by
  t_crawler_pokemon.id
;
