
select * from "Ref_Roles" rr ;

INSERT INTO public."Ref_Roles"
("Code", "TypeName", "NameRu", "IsDel", "Description")
VALUES('USER_ADMIN', 'Базовая роль', 'Базовая роль', false, '');

INSERT INTO public."Ref_Access"
("RoleId", "NameRu", "CodeAccessName", "TypeAccessName", "ActionName", "NameKk", "IsDel", "Description")
VALUES(1, 'Доступ на модуля администрирование', '', '', '', '', false, '');

select * from "Ref_Access" ra ;