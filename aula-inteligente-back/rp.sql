PGDMP                      }            DB_PuntoVenta    17.4    17.4 u    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            h           1262    18599    DB_PuntoVenta    DATABASE     u   CREATE DATABASE "DB_PuntoVenta" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-MX';
    DROP DATABASE "DB_PuntoVenta";
                     postgres    false            
           1255    19326 g   actualizar_cliente(character varying, character varying, character varying, character varying, integer) 	   PROCEDURE     �  CREATE PROCEDURE public.actualizar_cliente(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_estado character varying, IN p_id_usuario integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica si existe un cliente con el id_usuario proporcionado
    IF EXISTS (SELECT 1 FROM cliente WHERE id_usuario = p_id_usuario) THEN
        -- Actualiza los datos del cliente
        UPDATE cliente
        SET nombre_completo = p_nombre_completo,
            direccion = p_direccion,
            telefono = p_telefono,
            estado = p_estado
        WHERE id_usuario = p_id_usuario;

        -- Si el estado del cliente se actualiza, también actualiza el estado del usuario
        IF p_estado IS NOT NULL THEN
            UPDATE usuario
            SET estado = p_estado
            WHERE id = p_id_usuario;
        END IF;
    ELSE
        RAISE EXCEPTION 'No existe un cliente con el id_usuario: %', p_id_usuario;
    END IF;
END;
$$;
 �   DROP PROCEDURE public.actualizar_cliente(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_estado character varying, IN p_id_usuario integer);
       public               postgres    false                       1255    19329 �   actualizar_empleado(character varying, character varying, character varying, character varying, date, character varying, integer) 	   PROCEDURE     �  CREATE PROCEDURE public.actualizar_empleado(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_rol character varying, IN p_fecha_nacimiento date, IN p_estado character varying, IN p_id_usuario integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verificamos si existe un empleado con ese id_usuario
    IF NOT EXISTS (SELECT 1 FROM empleado WHERE id_usuario = p_id_usuario) THEN
        RAISE EXCEPTION 'No se encontró un empleado con id_usuario: %', p_id_usuario;
    END IF;

    -- Realizamos la actualización
    UPDATE empleado
    SET 
        nombre_completo = p_nombre_completo,
        direccion = p_direccion,
        telefono = p_telefono,
        rol = p_rol,
        fecha_nacimiento = p_fecha_nacimiento,
        estado = p_estado
    WHERE id_usuario = p_id_usuario;

	IF p_estado IS NOT NULL THEN
            UPDATE usuario
            SET estado = p_estado
            WHERE id = p_id_usuario;
        END IF;
END;
$$;
   DROP PROCEDURE public.actualizar_empleado(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_rol character varying, IN p_fecha_nacimiento date, IN p_estado character varying, IN p_id_usuario integer);
       public               postgres    false                       1255    19338 h   actualizar_producto(integer, character varying, character varying, character varying, character varying) 	   PROCEDURE     �  CREATE PROCEDURE public.actualizar_producto(IN p_id_producto integer, IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id_categoria INT;
    v_id_marca INT;
BEGIN
    -- Buscar ID de categoría por nombre
    SELECT id INTO v_id_categoria FROM categoria WHERE nombre = p_categoria;
    IF v_id_categoria IS NULL THEN
        RAISE EXCEPTION 'No se encontró la categoría: %', p_categoria;
    END IF;

    -- Buscar ID de marca por nombre
    SELECT id INTO v_id_marca FROM marca WHERE nombre = p_marca;
    IF v_id_marca IS NULL THEN
        RAISE EXCEPTION 'No se encontró la marca: %', p_marca;
    END IF;

    -- Actualizar producto
    UPDATE producto
    SET descripcion = p_descripcion,
        id_categoria = v_id_categoria,
        id_marca = v_id_marca,
        estado = p_estado
    WHERE id = p_id_producto;
END;
$$;
 �   DROP PROCEDURE public.actualizar_producto(IN p_id_producto integer, IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying);
       public               postgres    false                       1255    19380 z   actualizar_producto(integer, character varying, character varying, character varying, character varying, numeric, numeric) 	   PROCEDURE     Y  CREATE PROCEDURE public.actualizar_producto(IN p_id_producto integer, IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying, IN p_precio numeric, IN p_costo numeric)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id_categoria INT;
    v_id_marca INT;
BEGIN
    -- Verificar existencia del producto
    IF NOT EXISTS (SELECT 1 FROM producto WHERE id = p_id_producto) THEN
        RAISE EXCEPTION 'No existe un producto con el ID: %', p_id_producto;
    END IF;

    -- Buscar ID de categoría por nombre
    SELECT id INTO v_id_categoria FROM categoria WHERE nombre = p_categoria;
    IF v_id_categoria IS NULL THEN
        RAISE EXCEPTION 'No se encontró la categoría: %', p_categoria;
    END IF;

    -- Buscar ID de marca por nombre
    SELECT id INTO v_id_marca FROM marca WHERE nombre = p_marca;
    IF v_id_marca IS NULL THEN
        RAISE EXCEPTION 'No se encontró la marca: %', p_marca;
    END IF;

    -- Actualizar producto
    UPDATE producto
    SET descripcion = p_descripcion,
        id_categoria = v_id_categoria,
        id_marca = v_id_marca,
        estado = p_estado
    WHERE id = p_id_producto;

    -- Insertar nuevo historial de costo
    INSERT INTO costo_producto (
        id_producto,
        precio,
        fecha
    ) VALUES (
        p_id_producto,
        p_costo,
        CURRENT_DATE
    );

    -- Insertar nuevo historial de precio
    INSERT INTO precio_producto (
        id_producto,
        precio,
        fecha
    ) VALUES (
        p_id_producto,
        p_precio,
        CURRENT_DATE
    );
END;
$$;
 �   DROP PROCEDURE public.actualizar_producto(IN p_id_producto integer, IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying, IN p_precio numeric, IN p_costo numeric);
       public               postgres    false            �            1255    19327 !   eliminar_cliente_usuario(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.eliminar_cliente_usuario(IN p_id_usuario integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica si existe un cliente con ese id_usuario
    IF EXISTS (SELECT 1 FROM cliente WHERE id_usuario = p_id_usuario) THEN
        -- Actualiza el estado del cliente a 'eliminado'
        UPDATE cliente
        SET estado = 'eliminado'
        WHERE id_usuario = p_id_usuario;

        -- También actualiza el estado del usuario a 'eliminado'
        UPDATE usuario
        SET estado = 'eliminado'
        WHERE id = p_id_usuario;
    ELSE
        RAISE EXCEPTION 'No existe un cliente asociado al id_usuario: %', p_id_usuario;
    END IF;
END;
$$;
 I   DROP PROCEDURE public.eliminar_cliente_usuario(IN p_id_usuario integer);
       public               postgres    false                       1255    19330 "   eliminar_empleado_usuario(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.eliminar_empleado_usuario(IN p_id_usuario integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verifica si existe un empleado con ese id_usuario
    IF EXISTS (SELECT 1 FROM empleado WHERE id_usuario = p_id_usuario) THEN
        -- Actualiza el estado del empleado a 'eliminado'
        UPDATE empleado
        SET estado = 'eliminado'
        WHERE id_usuario = p_id_usuario;

        -- También actualiza el estado del usuario a 'eliminado'
        UPDATE usuario
        SET estado = 'eliminado'
        WHERE id = p_id_usuario;
    ELSE
        RAISE EXCEPTION 'No existe un empleado asociado al id_usuario: %', p_id_usuario;
    END IF;
END;
$$;
 J   DROP PROCEDURE public.eliminar_empleado_usuario(IN p_id_usuario integer);
       public               postgres    false                       1255    19340    eliminar_producto(integer) 	   PROCEDURE     �  CREATE PROCEDURE public.eliminar_producto(IN p_id_producto integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Verificar existencia
    IF NOT EXISTS (SELECT 1 FROM producto WHERE id = p_id_producto) THEN
        RAISE EXCEPTION 'No se encontró el producto con ID: %', p_id_producto;
    END IF;

    -- Eliminación lógica
    UPDATE producto
    SET estado = 'Eliminado'
    WHERE id = p_id_producto;
END;
$$;
 C   DROP PROCEDURE public.eliminar_producto(IN p_id_producto integer);
       public               postgres    false                       1255    19408    get_producto_activo(integer)    FUNCTION     �  CREATE FUNCTION public.get_producto_activo(p_id_producto integer) RETURNS TABLE(id integer, descripcion character varying, categoria character varying, marca character varying, descripcion_marca character varying, costo numeric, precio numeric, estado character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH ultimo_costo AS (
        SELECT 
            cp.id_producto AS uc_id_producto,
            cp.costo AS uc_costo,
            ROW_NUMBER() OVER (PARTITION BY cp.id_producto ORDER BY cp.fecha DESC) AS uc_rn
        FROM costo_producto cp
    ),
    ultimo_precio AS (
        SELECT 
            pp.id_producto AS up_id_producto,
            pp.precio AS up_precio,
            ROW_NUMBER() OVER (PARTITION BY pp.id_producto ORDER BY pp.fecha DESC) AS up_rn
        FROM precio_producto pp
    )
    SELECT 
        p.id AS producto_id,
        p.descripcion AS producto_descripcion,
        c.nombre AS categoria_nombre,
        m.nombre AS marca_nombre,
        m.descripcion_marca AS marca_descripcion,
        uc.uc_costo AS ultimo_costo,
        up.up_precio AS ultimo_precio,
        p.estado AS producto_estado
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id
    JOIN marca m ON p.id_marca = m.id
    LEFT JOIN ultimo_costo uc ON p.id = uc.uc_id_producto AND uc.uc_rn = 1
    LEFT JOIN ultimo_precio up ON p.id = up.up_id_producto AND up.up_rn = 1
    WHERE p.id = p_id_producto AND p.estado != 'eliminado';
END;
$$;
 A   DROP FUNCTION public.get_producto_activo(p_id_producto integer);
       public               postgres    false                       1255    19407    get_producto_todo(integer)    FUNCTION     `  CREATE FUNCTION public.get_producto_todo(p_id_producto integer) RETURNS TABLE(id integer, descripcion character varying, categoria character varying, marca character varying, descripcion_marca character varying, costo numeric, precio numeric, estado character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH ultimo_costo AS (
        SELECT 
            cp.id_producto AS cp_producto_id,
            cp.costo AS cp_precio_costo,
            ROW_NUMBER() OVER (PARTITION BY cp.id_producto ORDER BY cp.fecha DESC) AS cp_orden
        FROM costo_producto cp
    ),
    ultimo_precio AS (
        SELECT 
            pp.id_producto AS pp_producto_id,
            pp.precio AS pp_precio_venta,
            ROW_NUMBER() OVER (PARTITION BY pp.id_producto ORDER BY pp.fecha DESC) AS pp_orden
        FROM precio_producto pp
    )
    SELECT 
        p.id,
        p.descripcion,
        c.nombre AS categoria,
        m.nombre AS marca,
        m.descripcion_marca,
        uc.cp_precio_costo AS costo,
        up.pp_precio_venta AS precio,
        p.estado
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id
    JOIN marca m ON p.id_marca = m.id
    LEFT JOIN ultimo_costo uc ON p.id = uc.cp_producto_id AND uc.cp_orden = 1
    LEFT JOIN ultimo_precio up ON p.id = up.pp_producto_id AND up.pp_orden = 1
    WHERE p.id = p_id_producto;
END;
$$;
 ?   DROP FUNCTION public.get_producto_todo(p_id_producto integer);
       public               postgres    false                       1255    19404    get_productos_activos()    FUNCTION     �  CREATE FUNCTION public.get_productos_activos() RETURNS TABLE(id integer, descripcion character varying, categoria character varying, marca character varying, descripcion_marca character varying, costo numeric, precio numeric, estado character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH costo_actual AS (
        SELECT 
            cp.id_producto AS cp_id_producto,
            cp.costo AS cp_costo
        FROM costo_producto cp
        INNER JOIN (
            SELECT 
                id_producto, 
                MAX(fecha) AS ultima_fecha
            FROM costo_producto
            GROUP BY id_producto
        ) ultimo ON cp.id_producto = ultimo.id_producto AND cp.fecha = ultimo.ultima_fecha
    ),
    precio_actual AS (
        SELECT 
            pp.id_producto AS pp_id_producto,
            pp.precio AS pp_precio
        FROM precio_producto pp
        INNER JOIN (
            SELECT 
                id_producto, 
                MAX(fecha) AS ultima_fecha
            FROM precio_producto
            GROUP BY id_producto
        ) ultimo ON pp.id_producto = ultimo.id_producto AND pp.fecha = ultimo.ultima_fecha
    )
    SELECT 
        p.id AS producto_id,
        p.descripcion AS producto_descripcion,
        c.nombre AS categoria_nombre,
        m.nombre AS marca_nombre,
        m.descripcion_marca AS marca_descripcion,
        ca.cp_costo AS producto_costo,
        pa.pp_precio AS producto_precio,
        p.estado AS producto_estado
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id
    JOIN marca m ON p.id_marca = m.id
    LEFT JOIN costo_actual ca ON p.id = ca.cp_id_producto
    LEFT JOIN precio_actual pa ON p.id = pa.pp_id_producto
    WHERE p.estado <> 'eliminado'
    ORDER BY p.id ASC;
END;
$$;
 .   DROP FUNCTION public.get_productos_activos();
       public               postgres    false                       1255    19405    get_productos_todo()    FUNCTION     �  CREATE FUNCTION public.get_productos_todo() RETURNS TABLE(id integer, descripcion character varying, categoria character varying, marca character varying, descripcion_marca character varying, costo numeric, precio numeric, estado character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH ultimos_costos AS (
        SELECT 
            cp.id_producto,
            cp.costo,
            ROW_NUMBER() OVER (PARTITION BY cp.id_producto ORDER BY cp.fecha DESC) AS rn
        FROM costo_producto cp
    ),
    ultimos_precios AS (
        SELECT 
            pp.id_producto,
            pp.precio,
            ROW_NUMBER() OVER (PARTITION BY pp.id_producto ORDER BY pp.fecha DESC) AS rn
        FROM precio_producto pp
    )
    SELECT 
        p.id AS id_producto,
        p.descripcion,
        c.nombre AS categoria,
        m.nombre AS marca,
        m.descripcion_marca,
        uc.costo,
        up.precio AS precio_venta,
        p.estado AS estado_producto
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id
    JOIN marca m ON p.id_marca = m.id
    LEFT JOIN ultimos_costos uc ON uc.id_producto = p.id AND uc.rn = 1
    LEFT JOIN ultimos_precios up ON up.id_producto = p.id AND up.rn = 1
    ORDER BY p.id ASC;
END;
$$;
 +   DROP FUNCTION public.get_productos_todo();
       public               postgres    false            �            1255    19311 H   insertar_permisos(character varying, boolean, boolean, boolean, boolean) 	   PROCEDURE     �  CREATE PROCEDURE public.insertar_permisos(IN p_username character varying, IN p_crear boolean, IN p_editar boolean, IN p_eliminar boolean, IN p_ver boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_id_usuario INT;
BEGIN
  -- Obtener el id_usuario correspondiente al username
  SELECT id INTO v_id_usuario
  FROM usuario
  WHERE username = p_username;
  
  -- Verificar si el usuario existe
  IF v_id_usuario IS NULL THEN
    RAISE EXCEPTION 'Usuario no encontrado: %', p_username;
  END IF;

  -- Verificar si ya existen permisos para el usuario
  IF EXISTS (SELECT 1 FROM permisos WHERE id_usuario = v_id_usuario) THEN
    -- Si existen permisos, actualizarlos
    UPDATE permisos
    SET crear = p_crear,
        editar = p_editar,
        eliminar = p_eliminar,
        ver = p_ver
    WHERE id_usuario = v_id_usuario;
    
    -- Mensaje de éxito
    RAISE NOTICE 'Permisos actualizados correctamente para el usuario %', p_username;
  ELSE
    -- Si no existen permisos, insertarlos
    INSERT INTO permisos(id_usuario, crear, editar, eliminar, ver)
    VALUES (v_id_usuario, p_crear, p_editar, p_eliminar, p_ver);

    -- Mensaje de éxito
    RAISE NOTICE 'Permisos insertados correctamente para el usuario %', p_username;
  END IF;
END;
$$;
 �   DROP PROCEDURE public.insertar_permisos(IN p_username character varying, IN p_crear boolean, IN p_editar boolean, IN p_eliminar boolean, IN p_ver boolean);
       public               postgres    false                       1255    19379 o   insertar_producto(character varying, character varying, character varying, character varying, numeric, numeric) 	   PROCEDURE     �  CREATE PROCEDURE public.insertar_producto(IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying, IN p_precio numeric, IN p_costo numeric)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id_categoria INT;
    v_id_marca INT;
    v_id_producto INT;
BEGIN
    -- Buscar ID de la categoría por su nombre
    SELECT id INTO v_id_categoria FROM categoria WHERE nombre = p_categoria;
    IF v_id_categoria IS NULL THEN
        RAISE EXCEPTION 'No se encontró la categoría: %', p_categoria;
    END IF;

    -- Buscar ID de la marca por su nombre
    SELECT id INTO v_id_marca FROM marca WHERE nombre = p_marca;
    IF v_id_marca IS NULL THEN
        RAISE EXCEPTION 'No se encontró la marca: %', p_marca;
    END IF;

    -- Insertar el producto
    INSERT INTO producto (
        descripcion,
        id_marca,
        id_categoria,
        estado
    ) VALUES (
        p_descripcion,
        v_id_marca,
        v_id_categoria,
        p_estado
    ) RETURNING id INTO v_id_producto;

    -- Insertar costo del producto
    INSERT INTO costo_producto (
        id_producto,
        costo,
        fecha
    ) VALUES (
        v_id_producto,
        p_costo,
        CURRENT_DATE
    );

    -- Insertar precio del producto
    INSERT INTO precio_producto (
        id_producto,
        precio,
        fecha
    ) VALUES (
        v_id_producto,
        p_precio,
        CURRENT_DATE
    );
END;
$$;
 �   DROP PROCEDURE public.insertar_producto(IN p_descripcion character varying, IN p_categoria character varying, IN p_marca character varying, IN p_estado character varying, IN p_precio numeric, IN p_costo numeric);
       public               postgres    false                       1255    19325 p   registrar_cliente(character varying, character varying, character varying, character varying, character varying) 	   PROCEDURE     #  CREATE PROCEDURE public.registrar_cliente(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_estado character varying, IN p_username character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id_usuario INT;
BEGIN
    -- Buscar el id del usuario a partir del username
    SELECT id INTO v_id_usuario FROM usuario WHERE username = p_username;

    -- Verificar si se encontró el usuario
    IF v_id_usuario IS NULL THEN
        RAISE EXCEPTION 'No se encontró un usuario con el username: %', p_username;
    END IF;

    -- Verificar si el usuario ya está vinculado a un cliente
    IF EXISTS (SELECT 1 FROM cliente WHERE id_usuario = v_id_usuario) THEN
        RAISE EXCEPTION 'El usuario con username "%" ya está vinculado a un cliente.', p_username;
    END IF;

    -- Verificar si el usuario ya está vinculado a un empleado
    IF EXISTS (SELECT 1 FROM empleado WHERE id_usuario = v_id_usuario) THEN
        RAISE EXCEPTION 'El usuario con username "%" ya está vinculado a un empleado.', p_username;
    END IF;

    -- Insertar el cliente con el id_usuario obtenido
    INSERT INTO cliente(nombre_completo, direccion, telefono, id_usuario, estado)
    VALUES (p_nombre_completo, p_direccion, p_telefono, v_id_usuario, p_estado);
END;
$$;
 �   DROP PROCEDURE public.registrar_cliente(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_estado character varying, IN p_username character varying);
       public               postgres    false            	           1255    19328 �   registrar_empleado(character varying, character varying, character varying, character varying, date, character varying, character varying) 	   PROCEDURE     �  CREATE PROCEDURE public.registrar_empleado(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_rol character varying, IN p_fecha_nacimiento date, IN p_estado character varying, IN p_username character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_id_usuario INT;
BEGIN
    -- Buscar el ID del usuario a partir del username
    SELECT id INTO v_id_usuario
    FROM usuario
    WHERE username = p_username;

    -- Verificar si se encontró el usuario
    IF v_id_usuario IS NULL THEN
        RAISE EXCEPTION 'No se encontró un usuario con el username: %', p_username;
    END IF;

    -- Verificar si el usuario ya está vinculado a un cliente
    IF EXISTS (SELECT 1 FROM cliente WHERE id_usuario = v_id_usuario) THEN
        RAISE EXCEPTION 'El usuario con username "%" ya está vinculado a un cliente.', p_username;
    END IF;

    -- Verificar si el usuario ya está vinculado a un empleado
    IF EXISTS (SELECT 1 FROM empleado WHERE id_usuario = v_id_usuario) THEN
        RAISE EXCEPTION 'El usuario con username "%" ya está vinculado a un empleado.', p_username;
    END IF;

    -- Insertar el nuevo empleado
    INSERT INTO empleado (
        nombre_completo,
        direccion,
        telefono,
        rol,
        fecha_nacimiento,
        id_usuario,
        estado
    ) VALUES (
        p_nombre_completo,
        p_direccion,
        p_telefono,
        p_rol,
        p_fecha_nacimiento,
        v_id_usuario,
        p_estado
    );
END;
$$;
   DROP PROCEDURE public.registrar_empleado(IN p_nombre_completo character varying, IN p_direccion character varying, IN p_telefono character varying, IN p_rol character varying, IN p_fecha_nacimiento date, IN p_estado character varying, IN p_username character varying);
       public               postgres    false            �            1259    18997    carrito    TABLE     �   CREATE TABLE public.carrito (
    id integer NOT NULL,
    total numeric(10,2),
    fecha date,
    id_cliente integer,
    estado character varying(20)
);
    DROP TABLE public.carrito;
       public         heap r       postgres    false            �            1259    18996    carrito_id_seq    SEQUENCE     �   ALTER TABLE public.carrito ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.carrito_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    230            �            1259    18609 	   categoria    TABLE     ^   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nombre character varying(100)
);
    DROP TABLE public.categoria;
       public         heap r       postgres    false            �            1259    18608    categoria_id_seq    SEQUENCE     �   ALTER TABLE public.categoria ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    218            �            1259    18986    cliente    TABLE     �   CREATE TABLE public.cliente (
    id integer NOT NULL,
    nombre_completo character varying(100),
    direccion character varying(255),
    telefono character varying(15),
    id_usuario integer,
    estado character varying(20)
);
    DROP TABLE public.cliente;
       public         heap r       postgres    false            �            1259    18985    cliente_id_seq    SEQUENCE     �   ALTER TABLE public.cliente ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    228            �            1259    19331    codigoverificacion    TABLE     �   CREATE TABLE public.codigoverificacion (
    codigo character varying(5) NOT NULL,
    expiracion timestamp without time zone NOT NULL,
    usado boolean DEFAULT false
);
 &   DROP TABLE public.codigoverificacion;
       public         heap r       postgres    false            �            1259    19386    costo_producto    TABLE     �   CREATE TABLE public.costo_producto (
    id integer NOT NULL,
    id_producto integer,
    costo numeric(10,2),
    fecha date
);
 "   DROP TABLE public.costo_producto;
       public         heap r       postgres    false            �            1259    19385    costo_producto_id_seq    SEQUENCE     �   ALTER TABLE public.costo_producto ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.costo_producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    249            �            1259    19008    detalle_carrito    TABLE     �   CREATE TABLE public.detalle_carrito (
    id integer NOT NULL,
    cantidad integer,
    precio_unitario numeric(10,2),
    subtotal numeric(10,2),
    id_carrito integer,
    id_producto integer
);
 #   DROP TABLE public.detalle_carrito;
       public         heap r       postgres    false            �            1259    19007    detalle_carrito_id_seq    SEQUENCE     �   ALTER TABLE public.detalle_carrito ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.detalle_carrito_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    232            �            1259    19040    detalle_factura    TABLE     �   CREATE TABLE public.detalle_factura (
    id integer NOT NULL,
    id_factura integer,
    id_producto integer,
    cantidad integer,
    precio_unitario numeric(10,2)
);
 #   DROP TABLE public.detalle_factura;
       public         heap r       postgres    false            �            1259    19039    detalle_factura_id_seq    SEQUENCE     �   ALTER TABLE public.detalle_factura ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.detalle_factura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    236            �            1259    19304    django_migrations    TABLE     �   CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
 %   DROP TABLE public.django_migrations;
       public         heap r       postgres    false            �            1259    19303    django_migrations_id_seq    SEQUENCE     �   ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    242            �            1259    19314    empleado    TABLE     %  CREATE TABLE public.empleado (
    id integer NOT NULL,
    nombre_completo character varying(100),
    direccion character varying(255),
    telefono character varying(15),
    rol character varying(100),
    fecha_nacimiento date,
    id_usuario integer,
    estado character varying(20)
);
    DROP TABLE public.empleado;
       public         heap r       postgres    false            �            1259    19313    empleado_id_seq    SEQUENCE     �   ALTER TABLE public.empleado ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.empleado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    244            �            1259    19024    factura    TABLE     �   CREATE TABLE public.factura (
    id integer NOT NULL,
    fecha date NOT NULL,
    id_cliente integer,
    total numeric(10,2),
    id_metodo_pago integer,
    estado character varying(20)
);
    DROP TABLE public.factura;
       public         heap r       postgres    false            �            1259    19023    factura_id_seq    SEQUENCE     �   ALTER TABLE public.factura ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.factura_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    234            �            1259    19078 
   inventario    TABLE     �   CREATE TABLE public.inventario (
    id_inventario integer NOT NULL,
    id_producto integer,
    fecha date,
    cantidad integer
);
    DROP TABLE public.inventario;
       public         heap r       postgres    false            �            1259    19077    inventario_id_inventario_seq    SEQUENCE     �   ALTER TABLE public.inventario ALTER COLUMN id_inventario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.inventario_id_inventario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    240            �            1259    18939    marca    TABLE     �   CREATE TABLE public.marca (
    id integer NOT NULL,
    nombre character varying(100),
    descripcion_marca character varying(100)
);
    DROP TABLE public.marca;
       public         heap r       postgres    false            �            1259    18938    marca_id_seq    SEQUENCE     �   ALTER TABLE public.marca ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.marca_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    220            �            1259    18972    metodo_pago    TABLE     e   CREATE TABLE public.metodo_pago (
    id integer NOT NULL,
    descripcion character varying(100)
);
    DROP TABLE public.metodo_pago;
       public         heap r       postgres    false            �            1259    18971    metodo_pago_id_seq    SEQUENCE     �   ALTER TABLE public.metodo_pago ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.metodo_pago_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    224            �            1259    19067    permisos    TABLE     �   CREATE TABLE public.permisos (
    id_permiso integer NOT NULL,
    id_usuario integer,
    crear boolean,
    editar boolean,
    eliminar boolean,
    ver boolean
);
    DROP TABLE public.permisos;
       public         heap r       postgres    false            �            1259    19066    permisos_id_permiso_seq    SEQUENCE     �   ALTER TABLE public.permisos ALTER COLUMN id_permiso ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.permisos_id_permiso_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    238            �            1259    19369    precio_producto    TABLE     �   CREATE TABLE public.precio_producto (
    id integer NOT NULL,
    id_producto integer,
    precio numeric(10,2),
    fecha date
);
 #   DROP TABLE public.precio_producto;
       public         heap r       postgres    false            �            1259    19368    precio_producto_id_seq    SEQUENCE     �   ALTER TABLE public.precio_producto ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.precio_producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    247            �            1259    18945    producto    TABLE     �   CREATE TABLE public.producto (
    id integer NOT NULL,
    descripcion character varying(100),
    id_marca integer,
    id_categoria integer,
    estado character varying(20)
);
    DROP TABLE public.producto;
       public         heap r       postgres    false            �            1259    18944    producto_id_seq    SEQUENCE     �   ALTER TABLE public.producto ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    222            �            1259    18978    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    username character varying(50),
    password character varying(255),
    email character varying(255),
    tipo_usuario character varying(20),
    estado character varying(20)
);
    DROP TABLE public.usuario;
       public         heap r       postgres    false            �            1259    18977    usuario_id_seq    SEQUENCE     �   ALTER TABLE public.usuario ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    226            O          0    18997    carrito 
   TABLE DATA           G   COPY public.carrito (id, total, fecha, id_cliente, estado) FROM stdin;
    public               postgres    false    230   /�       C          0    18609 	   categoria 
   TABLE DATA           /   COPY public.categoria (id, nombre) FROM stdin;
    public               postgres    false    218   L�       M          0    18986    cliente 
   TABLE DATA           _   COPY public.cliente (id, nombre_completo, direccion, telefono, id_usuario, estado) FROM stdin;
    public               postgres    false    228   ��       ^          0    19331    codigoverificacion 
   TABLE DATA           G   COPY public.codigoverificacion (codigo, expiracion, usado) FROM stdin;
    public               postgres    false    245   ��       b          0    19386    costo_producto 
   TABLE DATA           G   COPY public.costo_producto (id, id_producto, costo, fecha) FROM stdin;
    public               postgres    false    249   ��       Q          0    19008    detalle_carrito 
   TABLE DATA           k   COPY public.detalle_carrito (id, cantidad, precio_unitario, subtotal, id_carrito, id_producto) FROM stdin;
    public               postgres    false    232   2�       U          0    19040    detalle_factura 
   TABLE DATA           a   COPY public.detalle_factura (id, id_factura, id_producto, cantidad, precio_unitario) FROM stdin;
    public               postgres    false    236   O�       [          0    19304    django_migrations 
   TABLE DATA           C   COPY public.django_migrations (id, app, name, applied) FROM stdin;
    public               postgres    false    242   l�       ]          0    19314    empleado 
   TABLE DATA           w   COPY public.empleado (id, nombre_completo, direccion, telefono, rol, fecha_nacimiento, id_usuario, estado) FROM stdin;
    public               postgres    false    244   ��       S          0    19024    factura 
   TABLE DATA           W   COPY public.factura (id, fecha, id_cliente, total, id_metodo_pago, estado) FROM stdin;
    public               postgres    false    234   ��       Y          0    19078 
   inventario 
   TABLE DATA           Q   COPY public.inventario (id_inventario, id_producto, fecha, cantidad) FROM stdin;
    public               postgres    false    240   ��       E          0    18939    marca 
   TABLE DATA           >   COPY public.marca (id, nombre, descripcion_marca) FROM stdin;
    public               postgres    false    220   ��       I          0    18972    metodo_pago 
   TABLE DATA           6   COPY public.metodo_pago (id, descripcion) FROM stdin;
    public               postgres    false    224   �       W          0    19067    permisos 
   TABLE DATA           X   COPY public.permisos (id_permiso, id_usuario, crear, editar, eliminar, ver) FROM stdin;
    public               postgres    false    238   "�       `          0    19369    precio_producto 
   TABLE DATA           I   COPY public.precio_producto (id, id_producto, precio, fecha) FROM stdin;
    public               postgres    false    247   H�       G          0    18945    producto 
   TABLE DATA           S   COPY public.producto (id, descripcion, id_marca, id_categoria, estado) FROM stdin;
    public               postgres    false    222   ��       K          0    18978    usuario 
   TABLE DATA           V   COPY public.usuario (id, username, password, email, tipo_usuario, estado) FROM stdin;
    public               postgres    false    226   ��       i           0    0    carrito_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.carrito_id_seq', 1, false);
          public               postgres    false    229            j           0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 6, true);
          public               postgres    false    217            k           0    0    cliente_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cliente_id_seq', 1, true);
          public               postgres    false    227            l           0    0    costo_producto_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.costo_producto_id_seq', 2, true);
          public               postgres    false    248            m           0    0    detalle_carrito_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.detalle_carrito_id_seq', 1, false);
          public               postgres    false    231            n           0    0    detalle_factura_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.detalle_factura_id_seq', 1, false);
          public               postgres    false    235            o           0    0    django_migrations_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.django_migrations_id_seq', 19, true);
          public               postgres    false    241            p           0    0    empleado_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.empleado_id_seq', 2, true);
          public               postgres    false    243            q           0    0    factura_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.factura_id_seq', 1, false);
          public               postgres    false    233            r           0    0    inventario_id_inventario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.inventario_id_inventario_seq', 1, false);
          public               postgres    false    239            s           0    0    marca_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.marca_id_seq', 3, true);
          public               postgres    false    219            t           0    0    metodo_pago_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.metodo_pago_id_seq', 1, false);
          public               postgres    false    223            u           0    0    permisos_id_permiso_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.permisos_id_permiso_seq', 1, true);
          public               postgres    false    237            v           0    0    precio_producto_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.precio_producto_id_seq', 2, true);
          public               postgres    false    246            w           0    0    producto_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.producto_id_seq', 5, true);
          public               postgres    false    221            x           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 7, true);
          public               postgres    false    225            �           2606    19001    carrito carrito_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_pkey;
       public                 postgres    false    230            �           2606    18613    categoria categoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public                 postgres    false    218            �           2606    18990    cliente cliente_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public                 postgres    false    228            �           2606    19336 *   codigoverificacion codigoverificacion_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.codigoverificacion
    ADD CONSTRAINT codigoverificacion_pkey PRIMARY KEY (codigo);
 T   ALTER TABLE ONLY public.codigoverificacion DROP CONSTRAINT codigoverificacion_pkey;
       public                 postgres    false    245            �           2606    19390 "   costo_producto costo_producto_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.costo_producto
    ADD CONSTRAINT costo_producto_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.costo_producto DROP CONSTRAINT costo_producto_pkey;
       public                 postgres    false    249            �           2606    19012 $   detalle_carrito detalle_carrito_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_pkey;
       public                 postgres    false    232            �           2606    19044 $   detalle_factura detalle_factura_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_pkey;
       public                 postgres    false    236            �           2606    19310 (   django_migrations django_migrations_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
       public                 postgres    false    242            �           2606    19318    empleado empleado_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_pkey;
       public                 postgres    false    244            �           2606    19028    factura factura_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_pkey;
       public                 postgres    false    234            �           2606    19082    inventario inventario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id_inventario);
 D   ALTER TABLE ONLY public.inventario DROP CONSTRAINT inventario_pkey;
       public                 postgres    false    240            �           2606    18943    marca marca_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public                 postgres    false    220            �           2606    18976    metodo_pago metodo_pago_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.metodo_pago
    ADD CONSTRAINT metodo_pago_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.metodo_pago DROP CONSTRAINT metodo_pago_pkey;
       public                 postgres    false    224            �           2606    19071    permisos permisos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (id_permiso);
 @   ALTER TABLE ONLY public.permisos DROP CONSTRAINT permisos_pkey;
       public                 postgres    false    238            �           2606    19373 $   precio_producto precio_producto_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.precio_producto
    ADD CONSTRAINT precio_producto_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.precio_producto DROP CONSTRAINT precio_producto_pkey;
       public                 postgres    false    247            �           2606    18949    producto producto_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public                 postgres    false    222            �           2606    18984    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public                 postgres    false    226            �           2606    19002    carrito carrito_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id);
 I   ALTER TABLE ONLY public.carrito DROP CONSTRAINT carrito_id_cliente_fkey;
       public               postgres    false    230    4747    228            �           2606    18991    cliente cliente_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);
 I   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_id_usuario_fkey;
       public               postgres    false    228    4745    226            �           2606    19391 .   costo_producto costo_producto_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.costo_producto
    ADD CONSTRAINT costo_producto_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);
 X   ALTER TABLE ONLY public.costo_producto DROP CONSTRAINT costo_producto_id_producto_fkey;
       public               postgres    false    4741    249    222            �           2606    19013 /   detalle_carrito detalle_carrito_id_carrito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carrito(id);
 Y   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_id_carrito_fkey;
       public               postgres    false    230    4749    232            �           2606    19018 0   detalle_carrito detalle_carrito_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);
 Z   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_id_producto_fkey;
       public               postgres    false    222    4741    232            �           2606    19045 /   detalle_factura detalle_factura_id_factura_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id);
 Y   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_id_factura_fkey;
       public               postgres    false    234    4753    236            �           2606    19050 0   detalle_factura detalle_factura_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);
 Z   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detalle_factura_id_producto_fkey;
       public               postgres    false    222    236    4741            �           2606    19319 !   empleado empleado_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);
 K   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_id_usuario_fkey;
       public               postgres    false    4745    226    244            �           2606    19029    factura factura_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id);
 I   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_id_cliente_fkey;
       public               postgres    false    228    234    4747            �           2606    19034 #   factura factura_id_metodo_pago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_metodo_pago_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodo_pago(id);
 M   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_id_metodo_pago_fkey;
       public               postgres    false    224    234    4743            �           2606    19083 &   inventario inventario_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);
 P   ALTER TABLE ONLY public.inventario DROP CONSTRAINT inventario_id_producto_fkey;
       public               postgres    false    4741    222    240            �           2606    19072 !   permisos permisos_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);
 K   ALTER TABLE ONLY public.permisos DROP CONSTRAINT permisos_id_usuario_fkey;
       public               postgres    false    238    226    4745            �           2606    19374 0   precio_producto precio_producto_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.precio_producto
    ADD CONSTRAINT precio_producto_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);
 Z   ALTER TABLE ONLY public.precio_producto DROP CONSTRAINT precio_producto_id_producto_fkey;
       public               postgres    false    247    222    4741            �           2606    18955 #   producto producto_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id);
 M   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_id_categoria_fkey;
       public               postgres    false    218    222    4737            �           2606    18950    producto producto_id_marca_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_id_marca_fkey FOREIGN KEY (id_marca) REFERENCES public.marca(id);
 I   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_id_marca_fkey;
       public               postgres    false    222    4739    220            O      x������ � �      C   /   x�3��I,(�/�2�tLNN-�/��/�2�tN�)�I,J-����� � �      M   >   x�3�HM)�W�LN,��tN��IU��/V���,�/�43002327�4�LL.
q��qqq �t�      ^      x������ � �      b   ,   x�3�4�44�30�4202�50�54�2�4�4600@����� �
�      Q      x������ � �      U      x������ � �      [   }  x���ێ� ���)��p}�M&D�K��rhڷ_4MZS�������Y�G'F���B���\evB�	5_]Ps!�\���*<�Iƽ�9�`1A3�r<))k�H�F(݇B���M@8_��2��9୓z���=�?Z���{VEY9��]�YM܀yF>�TMR����	�0��v�h�����؇�ޓ��`�P4����T�)M�[ʼ,����ةP0F���ŭ���ЙW;3�p,�D)��_/M��h�Y�'�z=�Xʍ+�q��]�/��a-���^�'�&\���'�+�H����?Q��(�z��t>�z��	��OA�����cs#��$F�Θl��Js����xaՙ��Ͽ�5�d�zn�>c���s��]�g�      ]   �   x�e�1!@�z8��.���6�B;c�BA��0�����L�����y
N�j����U�����ط�v-�`DT��;��=�@�X�(�AH)P�{�ᑙ�em��Kǐ	�~wJ�?���Rc�i�M�E���ˆ1���2�      S      x������ � �      Y      x������ � �      E   '   x�3�t�
�A��\F�@�������� ��      I      x������ � �      W      x�3�4�,�LA�=... ��      `   ,   x�3�4�42�30�4202�50�54�2�4�4500@����� �g�      G   T   x�3�I�IM���W�w�u���4�4�LL.�,��2��I,(�/PpO�M-RH��S�4UHIU04200PHO�S�4�4�)����� ݝ�      K   '  x�u��n�@@�5<�&��`���h��Ғ&� ?0r��ob��</p>,�a"�%�wS<{��|K���Z]yF���=s�f+ePj��P��я+݂�y�d������Ty8�#ɋ��2�,��<��A^�@���\T�-o��ZV� 씬[�Rߘ�,L�0C�L�Zkd��U�K`,gL�}E;2Nǋ���D�oC�B�jF�ї�e����H���C�����4�c9�=~�q/��6EY'���SoN;���c���m�b4��Y�Q�3��O�m,n��]��D��v��     