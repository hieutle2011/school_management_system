--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.3 (Debian 12.3-1.pgdg100+1)

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

--
-- Name: enum_school_payment_type; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.enum_school_payment_type AS ENUM (
    'free',
    'paid'
);


ALTER TYPE public.enum_school_payment_type OWNER TO "user";

--
-- Name: enum_user_role; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.enum_user_role AS ENUM (
    'Admin',
    'Owner',
    'Teacher',
    'HQ owner'
);


ALTER TYPE public.enum_user_role OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: child; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.child (
    id bigint NOT NULL,
    name character varying(256),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    version integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.child OWNER TO "user";

--
-- Name: child_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.child_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.child_id_seq OWNER TO "user";

--
-- Name: child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.child_id_seq OWNED BY public.child.id;


--
-- Name: classroom; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.classroom (
    id bigint NOT NULL,
    name character varying(256),
    year integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    version integer DEFAULT 0 NOT NULL,
    "teacherId" bigint,
    "schoolId" bigint
);


ALTER TABLE public.classroom OWNER TO "user";

--
-- Name: classroom_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.classroom_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classroom_id_seq OWNER TO "user";

--
-- Name: classroom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.classroom_id_seq OWNED BY public.classroom.id;


--
-- Name: school; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.school (
    id bigint NOT NULL,
    name character varying(256),
    parent_id bigint,
    payment_type public.enum_school_payment_type,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    version integer DEFAULT 0 NOT NULL,
    "ownerId" bigint
);


ALTER TABLE public.school OWNER TO "user";

--
-- Name: school_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.school_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.school_id_seq OWNER TO "user";

--
-- Name: school_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.school_id_seq OWNED BY public.school.id;


--
-- Name: tracking; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tracking (
    id bigint NOT NULL,
    time_check_in bigint,
    time_check_out bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    version integer DEFAULT 0 NOT NULL,
    "classroomId" bigint,
    "childId" bigint
);


ALTER TABLE public.tracking OWNER TO "user";

--
-- Name: tracking_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.tracking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tracking_id_seq OWNER TO "user";

--
-- Name: tracking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.tracking_id_seq OWNED BY public.tracking.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    username character varying(256),
    password character varying(256) NOT NULL,
    role public.enum_user_role,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    version integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."user" OWNER TO "user";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "user";

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: child id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.child ALTER COLUMN id SET DEFAULT nextval('public.child_id_seq'::regclass);


--
-- Name: classroom id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.classroom ALTER COLUMN id SET DEFAULT nextval('public.classroom_id_seq'::regclass);


--
-- Name: school id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.school ALTER COLUMN id SET DEFAULT nextval('public.school_id_seq'::regclass);


--
-- Name: tracking id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tracking ALTER COLUMN id SET DEFAULT nextval('public.tracking_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: child; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.child (id, name, "createdAt", "updatedAt", version) FROM stdin;
1	Jr John	2020-07-16 08:16:20.022+00	2020-07-16 08:16:20.022+00	0
2	Jr Frank	2020-07-16 08:16:20.022+00	2020-07-16 08:16:20.022+00	0
3	Jr Walter	2020-07-16 08:16:20.022+00	2020-07-16 08:16:20.022+00	0
4	Jr Donald	2020-07-16 08:16:20.022+00	2020-07-16 08:16:20.022+00	0
\.


--
-- Data for Name: classroom; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.classroom (id, name, year, "createdAt", "updatedAt", version, "teacherId", "schoolId") FROM stdin;
1	A1	2020	2020-07-16 08:16:20.016+00	2020-07-16 08:16:20.016+00	0	1	1
2	A2	2020	2020-07-16 08:16:20.016+00	2020-07-16 08:16:20.016+00	0	1	2
\.


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.school (id, name, parent_id, payment_type, "createdAt", "updatedAt", version, "ownerId") FROM stdin;
1	CFVG	\N	free	2020-07-16 08:16:20.011+00	2020-07-16 08:16:20.011+00	0	2
2	NEU	\N	paid	2020-07-16 08:16:20.011+00	2020-07-16 08:16:20.011+00	0	4
\.


--
-- Data for Name: tracking; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tracking (id, time_check_in, time_check_out, "createdAt", "updatedAt", version, "classroomId", "childId") FROM stdin;
1	1594887380025	1594887380025	2020-07-16 08:16:20.025+00	2020-07-16 08:16:20.025+00	0	1	1
2	1594887380025	1594887380025	2020-07-16 08:16:20.025+00	2020-07-16 08:16:20.025+00	0	1	2
3	1594887380026	1594887380026	2020-07-16 08:16:20.025+00	2020-07-16 08:16:20.025+00	0	2	3
4	1594887380026	1594887380026	2020-07-16 08:16:20.025+00	2020-07-16 08:16:20.025+00	0	2	4
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."user" (id, username, password, role, "createdAt", "updatedAt", version) FROM stdin;
1	Alice	pw	Teacher	2020-07-16 08:16:19.982+00	2020-07-16 08:16:19.982+00	0
2	Bob	pw	Owner	2020-07-16 08:16:19.982+00	2020-07-16 08:16:19.982+00	0
3	David	pw	Admin	2020-07-16 08:16:19.982+00	2020-07-16 08:16:19.982+00	0
4	Charles	pw	HQ owner	2020-07-16 08:16:19.982+00	2020-07-16 08:16:19.982+00	0
\.


--
-- Name: child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.child_id_seq', 4, true);


--
-- Name: classroom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.classroom_id_seq', 2, true);


--
-- Name: school_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.school_id_seq', 2, true);


--
-- Name: tracking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.tracking_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- Name: classroom classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_pkey PRIMARY KEY (id);


--
-- Name: school school_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT school_pkey PRIMARY KEY (id);


--
-- Name: tracking tracking_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tracking
    ADD CONSTRAINT tracking_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: classroom classroom_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT "classroom_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES public.school(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: classroom classroom_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT "classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: school school_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT "school_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tracking tracking_childId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tracking
    ADD CONSTRAINT "tracking_childId_fkey" FOREIGN KEY ("childId") REFERENCES public.child(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tracking tracking_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tracking
    ADD CONSTRAINT "tracking_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES public.classroom(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

