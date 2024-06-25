INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('USER_ADMIN', 'Базовая роль', 'Пользователь Администрирование', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('SUPER_ADMIN', 'Расширенная роль', 'Пользователь Администрирование', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('user_akimat_worker', 'Расширенная роль', 'Пользователь Акимата', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('user_akimat_chief', 'Базовая роль', 'Пользователь Акимата', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('user_all', 'Базовая роль', 'Пользователь Просмотр', false, '');

select * from "Ref_Roles" rr ;

---------------------------------------------------------------------

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на модуля администрирование', 'CAN_VIEW_ADMIN_MODULE', 'Экранная форма', 'чтение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на изменение структуры КАТО', 'CAN_VIEW_KATO', 'Сущность ', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на редактирование обьекта КАТО', '', '', '', false, '');

---
INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Блокировка учетки и сброс пароля на почту', '', 'Сущность', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Создание учетки', '', 'Сущность ', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Изменение учетки', '', 'Сущность', 'изменение', false, '');

---
INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на редактирование обьекта КАТО', '', 'Сущность', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на согласование', '', 'Атрибут ', 'согласование', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на корректировку  (возврат)', '', 'Сущность', 'изменение', false, '');

---
INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Забивка форм', '', 'Сущность', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('отправка формы на согласование', '', 'Атрибут ', 'согласование', false, '');

---
INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Просмотр карты', '', 'Экранная форма', 'чтение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Просмотр отчетов', '', 'Экранная форма', 'чтение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Просмотр форм', '', 'Экранная форма', 'чтение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Просмотр финансов', '', '', '', false, '');

---
INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Просмотр финансов', '', '', '', false, '');


select * from "Ref_Access" ra ;

----------------------------------------------

INSERT INTO public."Ref_Role_Access"
("RoleId", "AccessId", "NameRu", "NameKk", "IsDel", "Description")
VALUES(0, 0, '', '', false, '');


select * from "Ref_Role_Access" rra ; 

