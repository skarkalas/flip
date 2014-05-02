--table definition
------------------
create table students
(
	id number,
	datetime date
);

--sequences
----------------
create sequence students_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table students add constraint students_id_pk primary key (id);
alter table students add constraint students_datetime_nn check (datetime is not null);

--default values
----------------
alter table students modify datetime default sysdate;

--table definition
------------------
create table activity
(
	id number,
	state char(1),
	datetime date,
	student_id number
);

--sequences
----------------
create sequence activity_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table activity add constraint activity_id_pk primary key (id);
alter table activity add constraint activity_state_values check (state in ('A','I'));
alter table activity add constraint activity_student_id_nn check (student_id is not null);
alter table activity add constraint activity_student_id_fk foreign key (student_id) references students (id) on delete cascade;

--default values
----------------
alter table activity modify datetime default sysdate;

--table definition
------------------
create table sessions
(
	id number,
	action char(1),
	datetime date,
	student_id number
);

--sequences
----------------
create sequence sessions_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table sessions add constraint sessions_id_pk primary key (id);
alter table sessions add constraint sessions_action_nn check (action is not null);
alter table sessions add constraint sessions_action_values check (action in ('S','F'));
alter table sessions add constraint sessions_datetime_nn check (datetime is not null);
alter table sessions add constraint sessions_student_id_nn check (student_id is not null);
alter table sessions add constraint sessions_student_id_fk foreign key (student_id) references students (id) on delete cascade;

--default values
----------------
alter table sessions modify datetime default sysdate;

--table definition
------------------
create table exercises
(
	id number,
	name varchar2(20),
	description varchar2(100),
	datetime date,
	student_id number
);

--sequences
----------------
create sequence exercises_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table exercises add constraint exercises_id_pk primary key (id);
alter table exercises add constraint exercises_name_nn check (name is not null);
alter table exercises add constraint exercises_datetime_nn check (datetime is not null);
alter table exercises add constraint exercises_student_id_nn check (student_id is not null);
alter table exercises add constraint exercises_student_id_fk foreign key (student_id) references students (id) on delete set null;

--default values
----------------
alter table exercises modify datetime default sysdate;

--table definition
------------------
create table exercises_tasks
(
	id number,
	exercise_id number,
	task_id number
);

--sequences
----------------
create sequence exercises_tasks_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table exercises_tasks add constraint exercises_tasks_id_pk primary key (id);
alter table exercises_tasks add constraint exercises_tasks_exercise_id_nn check (exercise_id is not null);
alter table exercises_tasks add constraint exercises_tasks_task_id_nn check (task_id is not null);
alter table exercises_tasks add constraint exercises_tasks_ex_task_uq unique (exercise_id,task_id);

--table definition
------------------
create table tasks
(
	id number,
	name varchar2(20),
	description varchar2(100),
	datetime date
);

--sequences
----------------
create sequence tasks_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table tasks add constraint tasks_id_pk primary key (id);
alter table tasks add constraint tasks_name_nn check (name is not null);
alter table tasks add constraint tasks_description_nn check (description is not null);
alter table tasks add constraint tasks_datetime_nn check (datetime is not null);

--default values
----------------
alter table tasks modify datetime default sysdate;

--table definition
------------------
create table concepts_tasks
(
	id number,
	concept_id number,
	task_id number
);

--sequences
----------------
create sequence concepts_tasks_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table concepts_tasks add constraint concepts_tasks_id_pk primary key (id);
alter table concepts_tasks add constraint concepts_tasks_concept_id_nn check (concept_id is not null);
alter table concepts_tasks add constraint concepts_tasks_task_id_nn check (task_id is not null);
alter table concepts_tasks add constraint concepts_tasks_con_task_uq unique (concept_id,task_id);

--table definition
------------------
create table concepts
(
	id number,
	name varchar2(20),
	description varchar2(100),
);

--sequences
----------------
create sequence concepts_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table concepts add constraint concepts_id_pk primary key (id);
alter table concepts add constraint concepts_name_nn check (name is not null);
alter table concepts add constraint concepts_description_nn check (description is not null);

--table definition
------------------
create table attempts
(
	id number,
	code varchar2(20),
	datetime date,
	exercise_id number
);

--sequences
----------------
create sequence attempts_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table attempts add constraint attempts_id_pk primary key (id);
alter table attempts add constraint attempts_code_nn check (code is not null);
alter table attempts add constraint attempts_datetime_nn check (datetime is not null);
alter table attempts add constraint attempts_exercise_id_nn check (exercise_id is not null);
alter table attempts add constraint attempts_student_id_fk foreign key (student_id) references students (id) on delete set null;

--default values
----------------
alter table attempts modify datetime default sysdate;

--table definition
------------------
create table misconceptions_identified
(
	id number,
	rule_id number,
	exercise_id number,
	datetime date,
	state char(2),
	support_provided number(1)
);

--sequences
----------------
create sequence misconceptions_identified_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table misconceptions_identified add constraint misc_ident_id_pk primary key (id);
alter table misconceptions_identified add constraint misc_ident_rule_id_nn check (rule_id is not null);
alter table misconceptions_identified add constraint misc_ident_rule_id_fk foreign key (rule_id) references rules (id) on delete cascade;
alter table misconceptions_identified add constraint misc_ident_exercise_id_nn check (exercise_id is not null);
alter table misconceptions_identified add constraint misc_ident_exercise_id_fk foreign key (exercise_id) references exercises (id) on delete cascade;
alter table misconceptions_identified add constraint misc_ident_datetime_nn check (datetime is not null);
alter table misconceptions_identified add constraint misc_ident_state_nn check (state is not null);
alter table misconceptions_identified add constraint misc_ident_state_values check (state in ('L','NL'));
alter table misconceptions_identified add constraint misc_ident_sup_prov_nn check (support_provided is not null);
alter table misconceptions_identified add constraint misc_ident_sup_prov_values check (support_provided >= 0);

--default values
----------------
alter table misconceptions_identified modify datetime default sysdate;

--table definition
------------------
create table rules
(
	id number,
	name varchar2(20),
	description varchar2(100),
	misconception_category_id number
);

--sequences
----------------
create sequence rules_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table rules add constraint rules_id_pk primary key (id);
alter table rules add constraint rules_name_nn check (name is not null);
alter table rules add constraint rules_description_nn check (description is not null);
alter table rules add constraint rules_misconception_category_id_nn check (misconception_category_id is not null);
alter table rules add constraint rules_misconception_category_id_fk foreign key (misconception_category_id) references misconception_categories (id) on delete set null;

--table definition
------------------
create table misconception_categories
(
	id number,
	name varchar2(20),
	description varchar2(100),
);

--sequences
----------------
create sequence misconception_categories_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table misconception_categories add constraint misconception_categories_id_pk primary key (id);
alter table misconception_categories add constraint misconception_categories_name_nn check (name is not null);
alter table misconception_categories add constraint misconception_categories_description_nn check (description is not null);

--table definition
------------------
create table actions
(
	id number,
	rule_id number,
	action_id number,
	action varchar2(100)
);

--sequences
----------------
create sequence actions_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table actions add constraint actions_id_pk primary key (id);
alter table actions add constraint actions_rule_id_nn check (rule_id is not null);
alter table actions add constraint actions_rule_id_fk foreign key (rule_id) references rules (id) on delete cascade;
alter table actions add constraint actions_action_id_nn check (action_id is not null);
alter table actions add constraint actions_action_id_fk foreign key (action_id) references action_templates (id) on delete cascade;
alter table actions add constraint actions_action_nn check (action is not null);

--table definition
------------------
create table action_templates
(
	id number,
	name varchar2(20),
	template varchar2(100)
);

--sequences
----------------
create sequence action_templates_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table action_templates add constraint action_templates_id_pk primary key (id);
alter table action_templates add constraint action_templates_name_nn check (name is not null);
alter table action_templates add constraint action_templates_template_nn check (template is not null);

--table definition
------------------
create table conditions
(
	id number,
	rule_id number,
	fact_id number,
	abstract_fact varchar2(100)
);

--sequences
----------------
create sequence conditions_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table conditions add constraint conditions_id_pk primary key (id);
alter table conditions add constraint conditions_rule_id_nn check (rule_id is not null);
alter table conditions add constraint conditions_rule_id_fk foreign key (rule_id) references rules (id) on delete cascade;
alter table conditions add constraint conditions_fact_id_nn check (fact_id is not null);
alter table conditions add constraint conditions_fact_id_fk foreign key (fact_id) references fact_templates (id) on delete cascade;
alter table conditions add constraint conditions_abstract_fact_nn check (abstract_fact is not null);

--table definition
------------------
create table fact_templates
(
	id number,
	name varchar2(20),
	template varchar2(100)
);

--sequences
----------------
create sequence fact_templates_seq start with 1 increment by 1 nocycle nocache;

--constraints
-------------
alter table fact_templates add constraint fact_templates_id_pk primary key (id);
alter table fact_templates add constraint fact_templates_name_nn check (name is not null);
alter table fact_templates add constraint fact_templates_template_nn check (template is not null);