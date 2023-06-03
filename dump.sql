--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtag (
    hashtag_id integer NOT NULL,
    hashtag_tag character varying(255) NOT NULL,
    post_id integer NOT NULL
);


--
-- Name: hashtag_hashtag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtag_hashtag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtag_hashtag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtag_hashtag_id_seq OWNED BY public.hashtag.hashtag_id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    likes_id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: likes_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_likes_id_seq OWNED BY public.likes.likes_id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    post_link text NOT NULL,
    post_comment character varying(255) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    session_id integer NOT NULL,
    session_token character varying(255) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: session_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_session_id_seq OWNED BY public.session.session_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL,
    user_photo character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: hashtag hashtag_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag ALTER COLUMN hashtag_id SET DEFAULT nextval('public.hashtag_hashtag_id_seq'::regclass);


--
-- Name: likes likes_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN likes_id SET DEFAULT nextval('public.likes_likes_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: session session_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN session_id SET DEFAULT nextval('public.session_session_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: hashtag; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtag VALUES (2, '#google', 3);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 'https://www.instagram.com/p/Cs9GCAOrEyy/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==', 'Post do insta', 2, '2023-06-01 17:00:01.731422');
INSERT INTO public.posts VALUES (3, 'https://www.google.com', 'Site muito bom para pesquisa #google', 8, '2023-06-02 17:27:55.904274');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES (8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY4NTcwODY5OCwiZXhwIjoxNjg1Nzk0Njk4fQ.cZpfzPI7P_hp2psK_pE91eGnna1FAhxSDhwwvB60Alg', 17, '2023-06-02 12:24:59.016389');
INSERT INTO public.session VALUES (30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzE2MTcyLCJleHAiOjE2ODU4MDIxNzJ9.1v2cVu0jUa652lNxbQTxYvyXRVMxVJoEU6723zA_GwU', 8, '2023-06-02 14:29:32.794344');
INSERT INTO public.session VALUES (32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzE3Mzk2LCJleHAiOjE2ODU4MDMzOTZ9.GmErsUcK5TG838gBxnN97zHyajmZDYB_HwQ02uZ6DCQ', 8, '2023-06-02 14:49:56.179357');
INSERT INTO public.session VALUES (33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzE3NjQ4LCJleHAiOjE2ODU4MDM2NDh9.SmugzeCpNzgPR8b9Ug9dDv_6ogW_h8sGBfVy-SRxZng', 8, '2023-06-02 14:54:08.708157');
INSERT INTO public.session VALUES (34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzE4MTkxLCJleHAiOjE2ODU4MDQxOTF9.gchcLI7IxZOOi7BGqXRZzfL-y_AUzGZMkoWrO5bB96E', 8, '2023-06-02 15:03:11.474525');
INSERT INTO public.session VALUES (35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzE4MzU0LCJleHAiOjE2ODU4MDQzNTR9.bFsUigT9vQT0BkNnH1_dWuk1EJtD4ryfuM6-7fKhsDE', 8, '2023-06-02 15:05:54.889697');
INSERT INTO public.session VALUES (39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzIzMTQzLCJleHAiOjE2ODU4MDkxNDN9.hRsGOgZ2yh1arhQnXPTqxDNKVUMiEKb69bjYbyaJexg', 8, '2023-06-02 16:25:43.292797');
INSERT INTO public.session VALUES (40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzI0NTg2LCJleHAiOjE2ODU4MTA1ODZ9.9-Tm-2OjYeGoNhcTp-rv8G72JkaYjW6Jbumj3wgypH0', 8, '2023-06-02 16:49:46.85244');
INSERT INTO public.session VALUES (41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzI0NzQ5LCJleHAiOjE2ODU4MTA3NDl9.EAiMdFeBKozNjwq7o-VxMDp7Yxf5W6NohZ6Izdt6WpY', 8, '2023-06-02 16:52:29.491761');
INSERT INTO public.session VALUES (44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1NzMyOTQ0LCJleHAiOjE2ODU4MTg5NDR9.LMqXmVjCw5zstHVSfmJtQLqICyQdMUMiIqgrHWM5vco', 1, '2023-06-02 19:09:04.712041');
INSERT INTO public.session VALUES (45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjg1NzM1NjM1LCJleHAiOjE2ODU4MjE2MzV9.dkUUjfDs43yigXCySSFGgXhhdeP4-EKEk9iLWKR74Ws', 8, '2023-06-02 19:53:55.825776');
INSERT INTO public.session VALUES (46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1NzQwMTkxLCJleHAiOjE2ODU4MjYxOTF9.Ae8jL1gRXCqg80D9AYs4ajuUB-disV3Nsob-sjxCo8A', 1, '2023-06-02 21:09:51.486541');
INSERT INTO public.session VALUES (47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTY4NTc0MDMyMywiZXhwIjoxNjg1ODI2MzIzfQ.heN0Sxr-LNGkGnksVLpw1br9cBwZgW6-ssRc7lEsxdI', 21, '2023-06-02 21:12:03.48678');
INSERT INTO public.session VALUES (48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY4NTc0MDMzMSwiZXhwIjoxNjg1ODI2MzMxfQ.mgrIu1Y9LPQnr53SoDBCGPsGN5t4lhNAhz6sZt8F7sg', 22, '2023-06-02 21:12:11.184927');
INSERT INTO public.session VALUES (49, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY4NTc0MDQ3OCwiZXhwIjoxNjg1ODI2NDc4fQ.i1l-AWIoOZDyCq45qsiNrdUzLaM9KMdeDgwBvb0gag0', 19, '2023-06-02 21:14:38.394055');
INSERT INTO public.session VALUES (50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY4NTc0MDg4MywiZXhwIjoxNjg1ODI2ODgzfQ.pFuSMF_9iBbwgnqsNNpIjhaUy6UdhQ9eLHqjeB8HnWg', 19, '2023-06-02 21:21:23.549406');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'winicius', '$2b$10$E41Sc9SXdviV6wtcTzpE9etUSOOMfYzKm8sdkRhXMVU0xJ9X47wXu', 'https://http.cat/200', 'winicius@winicius.com', '2023-05-30 22:52:35.82302');
INSERT INTO public.users VALUES (2, 'xablau', '$2b$10$YLc26evDseLKFxvcBAMeIOzXZlmKqa7i3oKcGtW5oDwBe1F/hTVoi', 'foto.com.br', 'xablau@gmail.com', '2023-05-30 22:52:48.787843');
INSERT INTO public.users VALUES (7, 'savio', '$2b$10$ZG9j8H08j9BHp6CfSJ.OquLNAmq2dZut2RvDdYdB3pqcZNNsDq9yW', 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_6.jpg', 'savio@gmail.com', '2023-05-31 14:38:35.788669');
INSERT INTO public.users VALUES (8, 'amora', '$2b$10$zUT7gTp6RZF7MkgfXgwNreeg1tLIecJEc3PZcgiJur3R7.ir6dm7m', 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_6.jpg', 'amora@gmail.com', '2023-05-31 14:41:11.682753');
INSERT INTO public.users VALUES (9, 'jose', '$2b$10$WlZaZuVp1FtUJvB7Ub7NUOQkQ6NlpkXFkwzo9l9BHkZCgHHEOtaXq', 'https://http.cat/200', 'jose@jose.com', '2023-05-31 15:01:36.053121');
INSERT INTO public.users VALUES (10, 'cecilia', '$2b$10$DFc3F1S80Ff1MPw7D3suBuk7xjzUr1U6jeQZvZFmHfFF6mMNYzUhK', 'https://http.cat/404', 'cecilia@cecilia.com', '2023-05-31 15:12:01.757708');
INSERT INTO public.users VALUES (12, 'vavazin', '$2b$10$dEKimwqbuc2xkdiL4iptkuT1U60hHCZm6.ZktjZgu09sua.m9QtUW', 'https://artwork.40k.gallery/wp-content/uploads/2023/03/ramiz-askerov-bpr-composite-930x1024.jpg', 'vava@gmail.com', '2023-05-31 18:32:22.739258');
INSERT INTO public.users VALUES (17, 'Anderson Duarte', '$2b$10$Cy/BePMg0vzHTvGFbnnFK.nHp5pLPFgwxolLIMFruGaHOcbSvDLBm', 'https://res.cloudinary.com/practicaldev/image/fetch/s---UXjdvws--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_775/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wixrm7ejmrua4su7agha.jpg', 'anderson2@duarte.com', '2023-06-01 22:19:10.097969');
INSERT INTO public.users VALUES (19, 'vinicius vieira', '$2b$10$/DdhMNwijHxjS09Qt/tTUeD.iN2pe0535HnN6KcPUqqva/6JVfWUi', 'https://artwork.40k.gallery/wp-content/uploads/2023/03/ramiz-askerov-bpr-composite-930x1024.jpg', 'vv6@gmail.com', '2023-06-02 19:24:19.919713');
INSERT INTO public.users VALUES (21, 'vinicius VV', '$2b$10$eqsezhu.x6qbAgXyxSvLEONA6RuyGnU6rLUIPiQEGBUSfz0tfJsYW', 'https://www.rederpg.com.br/wp/wp-content/uploads/2017/03/Orc_Header-864x467.jpg', 'viniciuspv.si@gmail.com', '2023-06-02 21:11:48.387341');
INSERT INTO public.users VALUES (22, 'Anderson', '$2b$10$f6ZUVYbtNeU2KL5oBOc0TOjpzTrmnUw18hu3C8ZzQ6lfKnyEcpFhi', 'https://cdn-icons-png.flaticon.com/512/5969/5969113.png', 'anderson@duarte.com', '2023-06-02 21:11:59.485652');


--
-- Name: hashtag_hashtag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtag_hashtag_id_seq', 2, true);


--
-- Name: likes_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_likes_id_seq', 1, false);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 3, true);


--
-- Name: session_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_session_id_seq', 50, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 22, true);


--
-- Name: hashtag hashtag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT hashtag_pkey PRIMARY KEY (hashtag_id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (likes_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (session_id);


--
-- Name: users unique_user_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_user_email UNIQUE (user_email);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: hashtag hashtag_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT hashtag_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: session session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO linkrdbuser;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO linkrdbuser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO linkrdbuser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO linkrdbuser;


--
-- PostgreSQL database dump complete
--
