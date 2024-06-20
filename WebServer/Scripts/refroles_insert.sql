INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('USER_ADMIN', 'Базовая роль', 'Базовая роль', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('SUPER_ADMIN', 'Расширенная роль', 'Расширенная роль', false, '');

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('user_akimat_worker', 'Расширенная роль', 'Расширенная роль', false, '');
-------------------------------------------------------------------------------

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на модуля администрирование', 'CAN_VIEW_ADMIN_MODULE', 'Экранная форма', 'чтение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на изменение структуры КАТО', 'CAN_VIEW_KATO', 'Сущность', 'изменение', false, '');

INSERT INTO public."Ref_Access"
("NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "IsDel", "Description")
VALUES('Доступ на редактирование объекта КАТО', 'CAN_', '', '', false, '');

-----------------------------------------------------------------------------------------
INSERT INTO public."Ref_Role_Access"
("RoleId", "AccessId", "NameRu", "IsDel", "Description")
VALUES(1, 1, '', false, '');

INSERT INTO public."Ref_Role_Access"
("RoleId", "AccessId", "NameRu", "IsDel", "Description")
VALUES(1, 2, '', false, '');

INSERT INTO public."Ref_Role_Access"
("RoleId", "AccessId", "NameRu", "IsDel", "Description")
VALUES(1, 3, '', false, '');

-----------------------------------------------------------------------------------------
select * from "Ref_Access" ra ;
select * from "Ref_Roles" rr ;
select * from "Ref_Role_Access" rr ;

select * from "Ref_Katos" rk where "NameRu" like 'Усть%';
select * from "Accounts" a ;