-- MIGRAÇÃO NÃO DESTRUTIVA para bancos Aula 10/11/12 existentes.
-- Não apaga tabelas nem registros.
ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS senha_hash VARCHAR(255);

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'usuarios'
ORDER BY ordinal_position;
