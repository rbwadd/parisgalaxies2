select
    id, type,  (properties->>'label') as label,
    (properties->>'number') as number,
    (properties->>'dx') as dx,  
    properties::text as properties, 
    ST_AsGeoJson(ST_Centroid(geometry)) as geometry,
    the_geom_webmercator
from objects_webmercator
where type is not NULL
/* where_statement */
order by label
