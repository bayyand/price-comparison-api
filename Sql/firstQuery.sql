/* Create the database if not exist  */
CREATE ROLE app_user NOINHERIT LOGIN ENCRYPTED PASSWORD 'AVBbh@wzdFak6Cdasd1@@4313whx9ucf';
SELECT 'CREATE DATABASE pcadb with owner postgres'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pcadb')\gexec

/* Create the tables and assign the roles from app_user */

CREATE TABLE "Countries"(
    id SERIAL,
    "countryName" character varying(50) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Countries" TO app_user;

CREATE TABLE "Provinces"
(
    id serial,
    "provinceName" character varying(50) NOT NULL,
    "countryId" integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT provinces_countries_fkey FOREIGN KEY ("countryId")
        REFERENCES "Countries" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Provinces" TO app_user;

CREATE TABLE "Addresses"(
    id SERIAL,
    "countryId" integer NOT NULL,
    "provinceId" integer NOT NULL,
    "zipCode" character varying(20),
    "city" character varying(50) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT addresses_countries_fkey FOREIGN KEY ("countryId")
        REFERENCES "Countries" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT addresses_provinces_fkey FOREIGN KEY ("provinceId")
        REFERENCES "Provinces" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Addresses" TO app_user;

CREATE TABLE "Users"
(
    id serial,
    "name" character varying(25) NOT NULL,
    "lastName" character varying(25) NOT NULL,
    "email" character varying(256) NOT NULL UNIQUE,
    "phone" character varying(25) UNIQUE,
    "sex" char NOT NULL,
    "password" character varying(255) NOT NULL,
    "addressId" integer NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT users_addresses_fkey FOREIGN KEY ("addressId")
        REFERENCES "Addresses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE "Users" TO app_user;

CREATE TABLE "TypeOfEstablishments"(
    id SERIAL,
    "typeOfEstablishmentName" character varying(50) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);
GRANT INSERT, SELECT, UPDATE ON TABLE "TypeOfEstablishments" TO app_admin;

CREATE TABLE "Establishments"(
    id SERIAL,
    "establishmentName" character varying(50) NOT NULL,
    "typeOfEstablishmentId" integer NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT establishments_typeofestablishments_fkey FOREIGN KEY ("typeOfEstablishmentId")
        REFERENCES "TypeOfEstablishments" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Establishments" TO app_user;

CREATE TABLE "BranchOffices"(
    id SERIAL,
    "addressId" integer NOT NULL,
    "establishmentId" integer NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT branchoffices_addresses_fkey FOREIGN KEY ("addressId")
        REFERENCES "Addresses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT branchoffices_establishments_fkey FOREIGN KEY ("establishmentId")
        REFERENCES "Establishments" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "BranchOffices" TO app_user;

CREATE TABLE "Categories"(
    id SERIAL,
    "categoryName" character varying(50) NOT NULL,
    "description" character varying(255),
    PRIMARY KEY(id)
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Categories" TO app_user;

CREATE TABLE "Products"(
    id SERIAL,
    "barCode" character varying(30) UNIQUE NOT NULL,
    "categoryId" integer NOT NULL,
    "productName" character varying(60) NOT NULL,
    "createdAt" date NOT NULL,
    "updatedAt" timestamp without time zone NOT NULL ,
    PRIMARY KEY(id),
    CONSTRAINT products_categories_fkey FOREIGN KEY ("categoryId")
        REFERENCES "Categories" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Products" TO app_user;

CREATE TABLE "Images"(
    id SERIAL,
    "url" character varying(255) NOT NULL,
    "productId" integer NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT images_products_fkey FOREIGN KEY ("productId")
        REFERENCES "Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Images" TO app_user;

CREATE TABLE "PricesProductsBranchOffices"(
    id SERIAL,
    "productId" integer NOT NULL,
    "branchOfficeId" integer NOT NULL,
    "price" money NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT pricesproductsbranchoffices_products_fkey FOREIGN KEY ("productId")
        REFERENCES "Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT pricesproductsbranchoffices_branchoffices_fkey FOREIGN KEY ("branchOfficeId")
        REFERENCES "BranchOffices" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "PricesProductsBranchOffices" TO app_user;


CREATE TABLE "Rols"(
    id SERIAL,
    "rolName" character varying(30),
    description character varying(255),
    PRIMARY KEY(id)
);
GRANT INSERT, SELECT, UPDATE ON TABLE "Rols" TO app_user;

CREATE TABLE "UsersRols"(
    "userId" integer NOT NULL,
    "rolId" integer NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "Users" (id),
    FOREIGN KEY ("rolId") REFERENCES "Rols" (id)
);
GRANT INSERT, SELECT, UPDATE ON TABLE "UsersRols" TO app_user;

CREATE TABLE "AddressesUsers"(
    "userId" integer NOT NULL,
    "addressId" integer NOT NULL,
    CONSTRAINT addressesusers_users_fkey FOREIGN KEY ("userId")
        REFERENCES "Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT addressesusers_addresses_fkey FOREIGN KEY ("addressId")
        REFERENCES "Addresses" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
        NOT VALID
);
GRANT INSERT, SELECT, UPDATE ON TABLE "AddressesUsers" TO app_user;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;