SET search_path = products, public;

-- Drop tables in the reverse order of how they were created to avoid foreign key constraint issues
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create the products table
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	slogan TEXT NOT NULL,
	description TEXT NOT NULL,
	category TEXT NOT NULL,
	default_price INTEGER NOT NULL
) WITH (
  OIDS=FALSE
);

-- Create the features table
CREATE TABLE features (
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL,
	feature TEXT DEFAULT NULL,
	value TEXT DEFAULT NULL,
	-- Add a foreign key constraint to reference the products table
	CONSTRAINT features_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
) WITH (
  OIDS=FALSE
);

-- Create the styles table
CREATE TABLE styles (
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL,
	name TEXT NOT NULL,
  sale_price INTEGER DEFAULT NULL,
	original_price INTEGER NOT NULL,
	default_style TEXT NOT NULL,
	-- Add a foreign key constraint to reference the products table
	CONSTRAINT styles_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
) WITH (
  OIDS=FALSE
);

-- Create the photos table
CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
	style_id INTEGER NOT NULL,
	thumbnail_url TEXT NOT NULL,
	url TEXT NOT NULL,
	-- Add a foreign key constraint to reference the styles table
	CONSTRAINT photos_style_id_fk FOREIGN KEY (style_id) REFERENCES styles(id)
) WITH (
  OIDS=FALSE
);

-- Create the skus table
CREATE TABLE skus (
	id SERIAL PRIMARY KEY,
	style_id INTEGER NOT NULL,
	size TEXT NOT NULL,
	quantity INTEGER NOT NULL,
	-- Add a foreign key constraint to reference the styles table
	CONSTRAINT skus_style_id_fk FOREIGN KEY (style_id) REFERENCES styles(id)
) WITH (
  OIDS=FALSE
);

-- Create the related table
CREATE TABLE related (
	id SERIAL PRIMARY KEY,
	product_id integer NOT NULL,
	related_product_id integer NOT NULL,
	-- Add foreign key constraints to reference the products table
	CONSTRAINT related_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
) WITH (
  OIDS=FALSE
);

-- Create the cart table
CREATE TABLE cart (
	id SERIAL PRIMARY KEY,
	user_session integer NOT NULL,
	product_id integer NOT NULL,
	active TEXT NOT NULL,
	-- Add a foreign key constraint to reference the products table
	CONSTRAINT cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
) WITH (
  OIDS=FALSE
);

-- Create the necessary indexes
CREATE INDEX idx_features_product_id ON features(product_id);
CREATE INDEX idx_related_product_id ON related(product_id);
CREATE INDEX idx_styles_product_id ON styles(product_id);
CREATE INDEX idx_photos_style_id ON photos(style_id);
CREATE INDEX idx_skus_style_id ON skus(style_id);