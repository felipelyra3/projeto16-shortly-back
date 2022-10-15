--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortenUrl" text NOT NULL,
    visits integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (3, 1, 'http://google.com', 'google', 0, '2022-10-11 06:41:40.007149');
INSERT INTO public.shortens VALUES (6, 3, 'https://facebook.com', 'yk6ddD1ias', 0, '2022-10-11 08:06:58.489642');
INSERT INTO public.shortens VALUES (7, 3, 'https://instagram.com', '4yWvAMeIhO', 0, '2022-10-11 08:07:06.53876');
INSERT INTO public.shortens VALUES (5, 3, 'https://youtube.com', 's59MBvyJmk', 1, '2022-10-11 08:06:09.151556');
INSERT INTO public.shortens VALUES (4, 2, 'https://globo.com', 'rPkuRHayJE', 6, '2022-10-11 07:27:52.953695');
INSERT INTO public.shortens VALUES (8, 2, 'https://youtu.be/NoYKBAajoyo', 'Iip8lblcHf', 2, '2022-10-14 03:55:26.032071');
INSERT INTO public.shortens VALUES (9, 2, 'https://youtu.be/jeI992mvlEY', 'HU55kTESmy', 1, '2022-10-14 03:58:15.296402');
INSERT INTO public.shortens VALUES (14, 4, 'https://youtu.be/UkY8HvgvBJ8', 'gHMofC9xJD', 3, '2022-10-14 05:49:22.823972');
INSERT INTO public.shortens VALUES (15, 6, 'https://youtu.be/Q63RoZ9v4X0', 'vk58K7eI2X', 3, '2022-10-14 06:21:30.357349');
INSERT INTO public.shortens VALUES (16, 6, 'https://www.youtube.com/watch?v=SxhPskMuhus&list=RDMMXEOCbFJjRw0&index=19', 'sPvdZAclNP', 0, '2022-10-14 06:22:24.383987');
INSERT INTO public.shortens VALUES (17, 7, 'https://youtu.be/xgnPeROggH4', 'PjISdN-0Ab', 1, '2022-10-14 06:24:03.731502');
INSERT INTO public.shortens VALUES (18, 8, 'https://youtu.be/xgnPeROggH4', 'h5ClIz8FDb', 3, '2022-10-14 06:25:10.418414');
INSERT INTO public.shortens VALUES (19, 9, 'https://youtu.be/xgnPeROggH4', 'cQKDE0ah9C', 2, '2022-10-14 06:26:35.960707');
INSERT INTO public.shortens VALUES (20, 10, 'https://youtu.be/2SOnndZJ8y8', 'sIAWRZMlUd', 1, '2022-10-14 06:27:56.968313');
INSERT INTO public.shortens VALUES (21, 11, 'https://youtu.be/YjKncZceTGo', 'psKhru5abN', 2, '2022-10-14 06:30:48.224075');
INSERT INTO public.shortens VALUES (22, 12, 'https://youtu.be/YjKncZceTGo', 'dOtnQDN_5U', 0, '2022-10-14 06:31:42.975867');
INSERT INTO public.shortens VALUES (24, 4, 'https://youtu.be/HlN2BXNJzxA', 'z5YBaepbh6', 0, '2022-10-14 19:26:39.913182');
INSERT INTO public.shortens VALUES (25, 2, 'https://bootcampra.notion.site/Artigo-Deploy-de-aplica-es-back-end-no-Heroku-SQL-96ff4f6b854a4f4fa17a4f783edce785', 'VFfgbaF_9D', 0, '2022-10-14 20:51:01.516919');
INSERT INTO public.shortens VALUES (27, 13, 'https://youtu.be/HlN2BXNJzxA', 'y18h_eXvpK', 0, '2022-10-14 20:57:50.665551');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', 'driven', '2022-10-11 02:22:54.715084');
INSERT INTO public.users VALUES (2, 'Nathália', 'Nath@doslivros.com.br', '$2b$10$.3t1W20K1v.oW25kYl/2UuictySf5Q.YwQOEjZOqwsggoexib4.Sa', '2022-10-11 02:42:04.248683');
INSERT INTO public.users VALUES (3, 'Yago', 'yago@driven.com.br', '$2b$10$0Q5zica0Mc3pCVO6sl4OuuLfgsXr5l6WRqIfsiSYxCvweGcb4WNvK', '2022-10-11 08:03:18.09565');
INSERT INTO public.users VALUES (4, 'Bolinha', 'lalala@la.com', '$2b$10$R4UtGlyI/fg2dZKJDEyQpur.70YpCsCIjKQ6u5RaF9WB94ba8RgNO', '2022-10-13 21:15:05.63423');
INSERT INTO public.users VALUES (5, 'Gabriel', 'lala@la.com', '$2b$10$SfM6kipAMJmaMM4JdlAtvOIj6.le2pZR5fcxbQPolBgI.TQg9SLXi', '2022-10-13 21:22:53.370242');
INSERT INTO public.users VALUES (6, 'Sakura', 'sakura@cardcaptors.com', '$2b$10$EPAy62oCUIrmCN0A2O64S.1I4znZXUIRkgJ67tKf5eCGR4d5Uau.m', '2022-10-14 06:20:28.738266');
INSERT INTO public.users VALUES (7, 'a', 'a@a.com', '$2b$10$d4yT2JTSNrDThrMDURNgEubHaTy1ryGJpKLOz9PYNIc7VMBkVb.sm', '2022-10-14 06:23:19.129462');
INSERT INTO public.users VALUES (8, 'Elodie', 'elodie@italia.com', '$2b$10$JocZu9bEC1RU.4YhNIjqF.8vBlEG2sru2IoRpdj9eNb/HuHK2.iaC', '2022-10-14 06:24:42.528706');
INSERT INTO public.users VALUES (9, 'Bia', 'bia@bia.com', '$2b$10$OeGZrA5Y45L9/xz3awr0gO.3FV54Gh1x9DGbkNp.hCxFwI4crcHfS', '2022-10-14 06:26:14.69244');
INSERT INTO public.users VALUES (10, 'Gabriel', 'gabriel@gabriel.com', '$2b$10$qxAJ2RlE5bKFjAREEjixwur9pnM3MYNooxIypgZbaW..o8PqNZQHi', '2022-10-14 06:27:10.089814');
INSERT INTO public.users VALUES (11, 'Pabllo Vittar', 'pabllo@vittar.com', '$2b$10$ou/dEHUKqKa0AiAP3zcIc.yJqPlO6qtQNntJkfDcFZEBygm9IkEZu', '2022-10-14 06:30:39.380549');
INSERT INTO public.users VALUES (12, 'Flop', 'flop@flop.com', '$2b$10$Fr3PcmISK.vMIVhseXQI6etLbOXEWT/K8nDM19RUcLa8ZLkrs7cgS', '2022-10-14 06:31:30.825118');
INSERT INTO public.users VALUES (13, 'Vovó Juju', 'vovo@juju.com', '$2b$10$O4XtfS3BdYd.Qilj.5QY2ORcjZZ6C3ryvFag7Aso7aV7XELy5sGF.', '2022-10-14 20:56:20.296503');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 43, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 27, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_shortenUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_shortenUrl_key" UNIQUE ("shortenUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

