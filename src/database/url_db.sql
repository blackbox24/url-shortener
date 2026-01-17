--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    name character varying(250),
    shortcode character varying(50),
    createdat timestamp without time zone DEFAULT now() NOT NULL,
    updatedat timestamp without time zone DEFAULT now() NOT NULL,
    accesscount integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);

--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortcode_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_shortcode_key UNIQUE (shortcode);
