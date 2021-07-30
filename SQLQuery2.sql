--insert into[ProjectMaterials] (ProjectId, MaterialId)
--values (1, 8)

Select pm.id as pmid, pm.MaterialId, pm.ProjectId, m.id as mid, m.name as mname, m.price as mprice, m.userid as muserid, m.qty as mqty
                                        from ProjectMaterials as pm
                                        left join Materials as m on pm.MaterialId = m.id 
                                        where pm.ProjectId = 1