--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

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
-- Name: answers; Type: TABLE; Schema: public; Owner: qnauser
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    question_id integer,
    body character varying(1000) NOT NULL,
    date_written bigint NOT NULL,
    answerer_name character varying(50) DEFAULT ''::character varying NOT NULL,
    answerer_email character varying(50) DEFAULT ''::character varying NOT NULL,
    reported boolean DEFAULT false NOT NULL,
    helpfulness integer DEFAULT 0
);


ALTER TABLE public.answers OWNER TO qnauser;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: qnauser
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO qnauser;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qnauser
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: answers_photos; Type: TABLE; Schema: public; Owner: qnauser
--

CREATE TABLE public.answers_photos (
    id integer NOT NULL,
    answer_id integer,
    url character varying(150)
);


ALTER TABLE public.answers_photos OWNER TO qnauser;

--
-- Name: answers_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: qnauser
--

CREATE SEQUENCE public.answers_photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_photos_id_seq OWNER TO qnauser;

--
-- Name: answers_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qnauser
--

ALTER SEQUENCE public.answers_photos_id_seq OWNED BY public.answers_photos.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: qnauser
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    product_id integer NOT NULL,
    body character varying(1000) DEFAULT ''::character varying NOT NULL,
    date_written bigint NOT NULL,
    asker_name character varying(50) DEFAULT ''::character varying NOT NULL,
    asker_email character varying(50) DEFAULT ''::character varying NOT NULL,
    reported boolean DEFAULT false NOT NULL,
    helpful integer DEFAULT 0
);


ALTER TABLE public.questions OWNER TO qnauser;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: qnauser
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO qnauser;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qnauser
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: answers_photos id; Type: DEFAULT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers_photos ALTER COLUMN id SET DEFAULT nextval('public.answers_photos_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: qnauser
--

COPY public.questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM stdin;
1	1	What fabric is the top made of?	1595884714409	yankeelover	first.last@gmail.com	f	1
2	1	HEY THIS IS A WEIRD QUESTION!!!!?	1613888219613	jbilas	first.last@gmail.com	t	4
3	1	Does this product run big or small?	1608535907083	jbilas	first.last@gmail.com	f	8
4	1	How long does it last?	1594341317010	funnygirl	first.last@gmail.com	f	6
5	1	Can I wash it?	1608855284662	cleopatra	first.last@gmail.com	f	7
6	1	Is it noise cancelling?	1608855284662	coolkid	first.last@gmail.com	t	19
7	2	Where is this product made?	1590428073460	iluvcatz	first.last@gmail.com	f	0
8	2	Is this product sustainable?	1608855284662	coolkid	first.last@gmail.com	t	5
9	2	I'm allergic to dye #17, does this product contain any?	1598026382276	l33tgamer	first.last@gmail.com	f	6
\.



--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qnauser
--

SELECT pg_catalog.setval('public.answers_id_seq', 6879307, true);


--
-- Name: answers_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qnauser
--

SELECT pg_catalog.setval('public.answers_photos_id_seq', 2063760, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: qnauser
--

SELECT pg_catalog.setval('public.questions_id_seq', 3518964, true);


--
-- Name: answers_photos answers_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers_photos
    ADD CONSTRAINT answers_photos_pkey PRIMARY KEY (id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: answerindex; Type: INDEX; Schema: public; Owner: qnauser
--

CREATE INDEX answerindex ON public.answers_photos USING btree (answer_id);


--
-- Name: prodindex; Type: INDEX; Schema: public; Owner: qnauser
--

CREATE INDEX prodindex ON public.questions USING btree (product_id);


--
-- Name: questionindex; Type: INDEX; Schema: public; Owner: qnauser
--

CREATE INDEX questionindex ON public.answers USING btree (question_id);


--
-- Name: answers_photos ans; Type: FK CONSTRAINT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers_photos
    ADD CONSTRAINT ans FOREIGN KEY (answer_id) REFERENCES public.answers(id);


--
-- Name: answers quest; Type: FK CONSTRAINT; Schema: public; Owner: qnauser
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT quest FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- PostgreSQL database dump complete
--

