/*
 * Copyright Logister, S.A.
 */
package com.logister.silicon.model.commons.maestros;

import java.util.ArrayList;

import com.logister.silicon.model.commons.utils.PipedBuffer;

/**
 * Transfer Object de la tabla FORMCOME (Especialidades Farmacéuticas; antes era "Formas comerciales")
 * 
 * @author marta
 * @author <a href="mailto:carles.bellonch@grifols.com">Carles Bellonch</a>
 */
public class FCTO extends com.logister.commons.to.EntityMaestroTO {

	public static final String REPOSICION_COMPRA = "C";
	public static final String REPOSICION_FABRICACION = "F";

	/** Constantes para el campo Duración */
	public static final String DURACION_HORAS = "H";
	public static final String DURACION_DIAS = "D";
	public static final String DURACION_SEMANAS = "S";
	public static final String DURACION_MESES = "M";
	public static final String DURACION_ANYOS = "A";

	/** columna IDMEDICA */
	private Long id;
	/** columna CODINACI */
	private String codinaci;
	/** columna DESCRIPC */
	private String descripcion;
	/** columna NEMONICO */
	private String nemonico;
	/** columna DESCRIPCGESTION */
	private String descripcionGestion;
	/** columna NEMONICOGESTION */
	private String nemonicoGestion;

	/** columna IDGENERI - Genericos */
	private GenericoFKTO generico;

	/** columna IDESPECIALIDADTIPO */
	private EspecialidadTipoFKTO tipoEspecialidadFKTO;

	/** columna IDPROVEEDOR - Proveedores */
	private ProveedorFKTO proveedor;

	/** columna EXTRANJE */
	private Boolean extranje;

	/** columna ENSACLIN */
	private Boolean ensaclin;

	/** columna ENGUIA */
	private Boolean enguia;

	/** columna MULTIDOS */
	private Boolean multidos;

	/** columna COMPARTI */
	private String compartibleEnCarro;
	/** la esp. farmaceutica siempre es compartible en un carro para diferentes pacientes */
	public static final String COMPARTIBLE_EN_CARRO_SI = "S";
	/** la esp. farmaceutica NO es compartible en un carro para diferentes pacientes */
	public static final String COMPARTIBLE_EN_CARRO_NO = "N";
	/** la esp. farmaceutica es compartible en un carro para diferentes pacientes, según se indica en el carro */
	public static final String COMPARTIBLE_EN_CARRO_SEGUN_CARRO = "C";

	/** columna DURAABIE */
	private String duracion;
	/** columna DURABIUN */
	private String duracionUnidades;

	/** sin columna, se encuentra en el genérico */
	private String formaFarmaceutica;
	/** sin columna */
	private FormaFarmaFKTO formaFarmaceuticaUnidad;
	/** columna FACTORCOMPRA */
	private Integer factorCompra;
	/** columna FACTORSTOCKCOMPRA */
	private StockUnidadFKTO factorCompraUnidad;
	/** columna FACTORSUMINISTRO */
	private Integer factorSuministro;
	/** columna FACTORSTOCKSUMINISTRO */
	private StockUnidadFKTO factorSuministroUnidad;

	/** columna PEDIDOMINIMO */
	private Integer pedidoMinimo;

	/** columna REPOSICION */
	private String reposicion;

	/** columna CODIGOFACTURA */
	private String codigoFacturacion;
	/** columna PERMITECOMPRAR */
	private Boolean permiteComprar;
	/** columna PERMITEFABRICAR */
	private Boolean permiteFabricar;
	/** columna PERMITECOMPRACENTR */
	private Boolean permiteCompraCentralizada;

	/** columna PERMITECONSUMOS */
	private Boolean permiteConsumos;

	/** columna CONSUMIRHASTAAGOTAR */
	private Boolean consumirHastaAgotar;

	/** columna TRATAMIENTOLOTE */
	private String tratamientoLote;
	public static final String TRATAMIENTOLOTE_SI = "S";
	public static final String TRATAMIENTOLOTE_NO = "N";
	public static final String TRATAMIENTOLOTE_CONTROLCADUCIDAD = "C";

	/** columna IDENVASETIPO */
	private EnvaseTipoFKTO tipoEnvaseFKTO;

	/** columna IDIVA */
	private IvaTipoFKTO tipoIVAFKTO;

	/** columna DESCUENTO */
	private Double descuento = new Double(0.0);

	/** columna DESCUENTO2 */
	private Double descuento2;

	/** columna COPAGO */
	private Double copago;
	private Boolean isCopago;

	/** columna IDCUENTACONTABLE */
	private CuentaContableFKTO cuentaContableFKTO;

	/** columnas CLAVE1..5 */
	private ClaveFKTO clave1FKTO;
	private ClaveFKTO clave2FKTO;
	private ClaveFKTO clave3FKTO;
	private ClaveFKTO clave4FKTO;
	private ClaveFKTO clave5FKTO;

	/** columna FACDISAM */
	private Integer facdisam;
	/** columna FACDISHD */
	private Integer facdisHDIA;
	/** columna FACDISDO */
	private Integer facdisdo;
	/**
	 * La cantidad dispensada se ajustará al anterior entero múltiplo del múltiplo de dispensación de la ficha de
	 * especialidad
	 */
	public static final String POR_DEFECTO = "D";
	/** La cantidad se ajustará al siguiente entero múltiplo del múltiplo de dispensación de la ficha de especialidad. */
	public static final String POR_EXCESO = "E";
	/** La cantidad se ajustará al entero múltiplo más próximo del múltiplo de dispensación de la ficha de especialidad */
	public static final String AL_MAS_PROXIMO = "P";

	/**
	 * columna VERIFICARDISP
	 */
	private Boolean verificarDispAmb;

	/** columna FRACCIONINGRESO */
	private Integer fraccionIngreso;

	/** columna FRACCIONAMBULATORIO */
	private Integer fraccionAmbulatorio;

	/** columna FICHAFIN: indica si la especialidad esta finalizada */
	private Boolean finaliza;
	/** columna EAN13 reenvasado */
	private String ean13reenvasado;
	/** columna EAN13 compra */
	private String ean13compra;
	/** columna EAN13 suministro */
	private String ean13suministro;
	/** columna Gestionar pedidos por */
	private String gestionarPedidosPor;
	/** Gestionar pedidos por envase de compra */
	public static final String POR_ENVASE_COMPRA = "C";
	/** Gestionar pedidos por unidad de suministro */
	public static final String POR_UNIDAD_SUMINISTRO = "S";

	/** columna DISPINGR */
	private Boolean dispingr;
	/** columna DISPAMBU */
	private Boolean dispambu;
	/** columna DISPHDIA */
	private Boolean disphdia;
	/** columna DISPDOMI */
	private Boolean dispdomi;
	/** columna DISPMIV */
	private Boolean dispMiv;
	/** columna DISPIRMP */
	private Boolean dispirmp;
	/** columna DISPFOMA */
	private Boolean dispFormulaMagistral;

	/** columna DISPPLANTA */
	private Boolean dispPlanta;

	/** columna DISPENSAR: S/N */
	private Boolean dispensar;
	public static final String LUGARDISPENSACION_FARMACIA = "F";
	public static final String LUGARDISPENSACION_PLANTA = "P";

	/** columna IFFRACCI */
	private Integer iffracci;

	/** columna IDORDTIP */
	private OrdenacionesTipoFKTO ordenacionesTipoFKTO;

	/** columna FCPVL */
	private Double fcpvl;
	/** columna FCPVP */
	private Double fcpvp;

	/** columna ALTIDPRES */
	private String altidPres;
	/** columna ALTIDGESTION */
	private String altidGestion;

	/** columna FORMAFARMACEUTICA */
	private String lugarDispensacion;

	/** columna ACTIVO */
	private Boolean activo;

	/** idconten */
	private ContenedorFKTO contenedorFKTO;

	/** columna COMPOSICIONVALIDA */
	private String composicionValida;

	/* Sin columna. Para mostrar el estado del campo COMPOSICIONVALIDA */
	private String nombreFicheroImagenComposicionValida;
	private String literalImagenComposicionValida;

	/** columna IDAREARESOLUCIONFABRICACION */
	private AreaResolucionFKTO areaResolucionFabricacionFKTO;

	/** columna IDUTFABRICACION */
	private UeFKTO unidadTratamientoFabricacionFKTO;

	/** columna CANTIDADRECOMENDADA */
	private Long cantidadRecomendada;

	/** columna OBSERVACIONESFABRICACION */
	private String observacionesFabricacion;

	/**
	 * columna IDMEDICATRASPASO. Es el id de otra especialidad de FORMCOME a la que se ha traspasado la especialidad
	 * representada por este objeto FCTO. Se utiliza en el proceso de traspaso de especialidad. En el maestro de
	 * especialidades, representa a la especialidad de la pestaña "Gestión" fila "Traspasada por".
	 */
//	private Long idMedicaTraspaso;
//	private String codinaciMedicaTraspaso; // Sin columna.
//	private String descripGestionMedicaTraspaso; // Sin columna.
	private String traspasadaDesde; // Sin columna
	private Boolean lanzarTraspaso; // Sin columna
	private FCTO especialidadTraspaso;

	/** Fabricación normalizada */
	/** sin columna. Booleano que indica si existen albaranes de compra asociados a la especialidad */
	private Boolean isReposicionCompraAndAlbaranCompraAsociado;
	/** sin columna. Booleano que indica si existen órdenes de fabricación asociadas */
	private Boolean isReposicionFabricarAndOrdenFabricacionAsociada;
	/** sin columna. Booleano que indica si se debe habilitar/deshabilitar la pestaña de fabricación normalizada */
	private Boolean isPestanyaFabricacionVisible;
	/** sin columna. Booleano que indica si se debe habilitar/deshabilitar el botón 'eliminar' */
	private Boolean isBotonEliminarActivo;

	private boolean pestanyaExcipientesActiva;
	private boolean pestanyaAlmacenActiva;
	private boolean pestanyaStockActiva;
	private boolean pestanyaMovimientosActiva;
	private boolean pestanyaAnyoActiva;
	private boolean pestanyaPrescripcionActiva;
	private boolean pestanyaInfantilActiva;
	private boolean pestanyaGestionActiva;

	/** Fabricación normalizada. Constantes para el estado de la validación de la especialida */
	public static final String FABRICACION_NORMALIZADA_PENDIENTE_VALIDAR_COMPOSICION = "PE";
	public static final String FABRICACION_NORMALIZADA_IMPOSIBLE_VALIDAR = "IV";
	public static final String FABRICACION_NORMALIZADA_COMPOSICION_NO_VALIDA = "NV";
	public static final String FABRICACION_NORMALIZADA_COMPOSICION_VALIDA = "V";
	public static final String FABRICACION_NORMALIZADA_ESTADO_POR_DEFECTO = FCTO.FABRICACION_NORMALIZADA_PENDIENTE_VALIDAR_COMPOSICION;
	//Catálogos de medicación asociados a la especialidad
	private ArrayList<Long> idCatalogoAL;

	public FCTO() {
		this.setPestanyaExcipientesActiva(true);
		this.setPestanyaAlmacenActiva(true);
		this.setPestanyaStockActiva(true);
		this.setPestanyaMovimientosActiva(true);
		this.setPestanyaAnyoActiva(true);
		this.setPestanyaPrescripcionActiva(true);
		this.setPestanyaInfantilActiva(true);
		this.setPestanyaGestionActiva(true);
	}

	/**
	 * @param id
	 */
	public FCTO(Long id) {
		super();
		this.id = id;
	}

	/**
	 * Sobrescribimos el método equals. Dos elementos son iguales si tiene el mismo ID. Si se modifica hay que tener en
	 * cuenta que algunos procesos dependen de que se compare sólo el ID.
	 */
	public boolean equals(Object fc) {
		boolean ret = false;
		if (fc instanceof FCTO) {
			ret = fc != null && ((FCTO) fc).getId().equals(this.id);
		}
		return ret;
	}

	public int hashCode() {
		int ret = -1;
		if (id != null) {
			ret = id.hashCode();
		}
		return ret;
	}

	/**
	 * @return the copago
	 */
	public Double getCopago() {
		return copago;
	}

	/**
	 * @param copago
	 *            the copago to set
	 */
	public void setCopago(Double copago) {
		this.copago = copago;
	}

	/**
	 * DSGN50380. Se considera una especialidad como de copago cuando tenga informado un copago > 0.
	 * 
	 * @return the isCopago
	 */
	public Boolean getIsCopago() {
		if (this.copago != null && this.copago.doubleValue() > 0.0d) {
			isCopago = Boolean.TRUE;
		} else {
			isCopago = Boolean.FALSE;
		}
		return isCopago;
	}

	public Integer getFraccionAmbulatorio() {
		return fraccionAmbulatorio;
	}

	public void setFraccionAmbulatorio(Integer fraccionAmbulatorio) {
		this.fraccionAmbulatorio = fraccionAmbulatorio;
	}

//	public Long getIdMedicaTraspaso() {
//		return idMedicaTraspaso;
//	}
//
//	public void setIdMedicaTraspaso(Long idMedicaTraspaso) {
//		this.idMedicaTraspaso = idMedicaTraspaso;
//	}

	public Boolean getIsBotonEliminarActivo() {
		return isBotonEliminarActivo;
	}

	public void setIsBotonEliminarActivo(Boolean isBotonEliminarActivo) {
		this.isBotonEliminarActivo = isBotonEliminarActivo;
	}

	public Boolean getIsPestanyaFabricacionVisible() {
		return isPestanyaFabricacionVisible;
	}

	public void setIsPestanyaFabricacionVisible(Boolean isPestanyaFabricacionVisible) {
		this.isPestanyaFabricacionVisible = isPestanyaFabricacionVisible;
	}

	public String getNombreFicheroImagenComposicionValida() {
		return nombreFicheroImagenComposicionValida;
	}

	public void setNombreFicheroImagenComposicionValida(String nombreFicheroImagenComposicionValida) {
		this.nombreFicheroImagenComposicionValida = nombreFicheroImagenComposicionValida;
	}

	public String getLiteralImagenComposicionValida() {
		return literalImagenComposicionValida;
	}

	public void setLiteralImagenComposicionValida(String literalImagenComposicionValida) {
		this.literalImagenComposicionValida = literalImagenComposicionValida;
	}

	public String getComposicionValida() {
		return composicionValida;
	}

	public void setComposicionValida(String composicionValida) {
		this.composicionValida = composicionValida;
	}

	public AreaResolucionFKTO getAreaResolucionFabricacionFKTO() {
		return areaResolucionFabricacionFKTO;
	}

	public void setAreaResolucionFabricacionFKTO(AreaResolucionFKTO areaResolucionFabricacionFKTO) {
		this.areaResolucionFabricacionFKTO = areaResolucionFabricacionFKTO;
	}

	public UeFKTO getUnidadTratamientoFabricacionFKTO() {
		return unidadTratamientoFabricacionFKTO;
	}

	public void setUnidadTratamientoFabricacionFKTO(UeFKTO unidadTratamientoFabricacionFKTO) {
		this.unidadTratamientoFabricacionFKTO = unidadTratamientoFabricacionFKTO;
	}

	public Long getCantidadRecomendada() {
		return cantidadRecomendada;
	}

	public void setCantidadRecomendada(Long cantidadRecomendada) {
		this.cantidadRecomendada = cantidadRecomendada;
	}

	public String getObservacionesFabricacion() {
		return observacionesFabricacion;
	}

	public void setObservacionesFabricacion(String observacionesFabricacion) {
		this.observacionesFabricacion = observacionesFabricacion;
	}

	public Boolean getIsReposicionFabricarAndOrdenFabricacionAsociada() {
		return isReposicionFabricarAndOrdenFabricacionAsociada;
	}

	public void setIsReposicionFabricarAndOrdenFabricacionAsociada(
	        Boolean isReposicionFabricarAndOrdenFabricacionAsociada) {
		this.isReposicionFabricarAndOrdenFabricacionAsociada = isReposicionFabricarAndOrdenFabricacionAsociada;
	}

	public Boolean getIsReposicionCompraAndAlbaranCompraAsociado() {
		return isReposicionCompraAndAlbaranCompraAsociado;
	}

	public void setIsReposicionCompraAndAlbaranCompraAsociado(Boolean isReposicionCompraAndAlbaranCompraAsociado) {
		this.isReposicionCompraAndAlbaranCompraAsociado = isReposicionCompraAndAlbaranCompraAsociado;
	}

	public Boolean getPermiteConsumos() {
		return permiteConsumos;
	}

	public void setPermiteConsumos(Boolean permiteConsumos) {
		this.permiteConsumos = permiteConsumos;
	}

	public Boolean getConsumirHastaAgotar() {
		return consumirHastaAgotar;
	}

	public void setConsumirHastaAgotar(Boolean consumirHastaAgotar) {
		this.consumirHastaAgotar = consumirHastaAgotar;
	}

	public Integer getFacdisHDIA() {
		return facdisHDIA;
	}

	public Integer getFacdisdo() {
		return facdisdo;
	}

	public void setFacdisHDIA(Integer facdisHDIA) {
		this.facdisHDIA = facdisHDIA;
	}

	public void setFacdisdo(Integer facdisdo) {
		this.facdisdo = facdisdo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodinaci() {
		return codinaci;
	}

	public void setCodinaci(String codinaci) {
		this.codinaci = codinaci;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getNemonico() {
		return nemonico;
	}

	public void setNemonico(String nemonico) {
		this.nemonico = nemonico;
	}

	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}

	public Boolean getEnsaclin() {
		return ensaclin;
	}

	public void setEnsaclin(Boolean ensaclin) {
		this.ensaclin = ensaclin;
	}

	public Boolean getExtranje() {
		return extranje;
	}

	public void setExtranje(Boolean extranje) {
		this.extranje = extranje;
	}

	public Boolean getMultidos() {
		return multidos;
	}

	public void setMultidos(Boolean multidos) {
		this.multidos = multidos;
	}

	public GenericoFKTO getGenerico() {
		return generico;
	}

	public void setGenerico(GenericoFKTO generico) {
		this.generico = generico;
	}

	public String getDuracion() {
		return duracion;
	}

	public void setDuracion(String duracion) {
		this.duracion = duracion;
	}

	public String getDuracionUnidades() {
		return duracionUnidades;
	}

	public void setDuracionUnidades(String duracionUnidades) {
		this.duracionUnidades = duracionUnidades;
	}

	public String getAltidGestion() {
		return altidGestion;
	}

	public void setAltidGestion(String altid1) {
		this.altidGestion = altid1;
	}

	public String getEan13reenvasado() {
		return ean13reenvasado;
	}

	public void setEan13reenvasado(String ean13reenvasado) {
		this.ean13reenvasado = ean13reenvasado;
	}

	public String getEan13compra() {
		return ean13compra;
	}

	public void setEan13compra(String ean13compra) {
		this.ean13compra = ean13compra;
	}

	public String getEan13suministro() {
		return ean13suministro;
	}

	public void setEan13suministro(String ean13suministro) {
		this.ean13suministro = ean13suministro;
	}

	public String getGestionarPedidosPor() {
		return gestionarPedidosPor;
	}

	public void setGestionarPedidosPor(String gestionarPedidosPor) {
		this.gestionarPedidosPor = gestionarPedidosPor;
	}

	public Integer getFraccionIngreso() {
		return fraccionIngreso;
	}

	public Integer getFraccionIngresadoSegunUEInfantil(String tipoUE) {
		if (tipoUE != null && tipoUE.equalsIgnoreCase(UeTO.TIPOPACIENTEUE_INFANTIL)) {
			return iffracci;
		} else {
			return fraccionIngreso;
		}
	}

	public void setFraccionIngreso(Integer fraccionIngreso) {
		this.fraccionIngreso = fraccionIngreso;
	}

	public ProveedorFKTO getProveedor() {
		return proveedor;
	}

	public void setProveedor(ProveedorFKTO proveedor) {
		this.proveedor = proveedor;
	}

	public Boolean getFinaliza() {
		return finaliza;
	}

	public void setFinaliza(Boolean finaliza) {
		this.finaliza = finaliza;
	}

	public String getCompartibleEnCarro() {
		return compartibleEnCarro;
	}

	public void setCompartibleEnCarro(String compartir) {
		this.compartibleEnCarro = compartir;
	}

	public String getLugar() {
		if (dispensar.booleanValue()) {
			return LUGARDISPENSACION_FARMACIA;
		} else {
			return LUGARDISPENSACION_PLANTA;
		}
	}

	public Boolean getDispingr() {
		return dispingr;
	}

	public void setDispingr(Boolean dispingr) {
		this.dispingr = dispingr;
	}

	public Boolean getDispambu() {
		return dispambu;
	}

	public void setDispambu(Boolean dispambu) {
		this.dispambu = dispambu;
	}

	public Boolean getDisphdia() {
		return disphdia;
	}

	public void setDisphdia(Boolean disphdia) {
		this.disphdia = disphdia;
	}

	public Boolean getDispdomi() {
		return dispdomi;
	}

	public void setDispdomi(Boolean dispdomi) {
		this.dispdomi = dispdomi;
	}

	public Integer getFacdisam() {
		return facdisam;
	}

	public void setFacdisam(Integer facdisam) {
		this.facdisam = facdisam;
	}

	public Boolean getDispMiv() {
		return dispMiv;
	}

	public void setDispMiv(Boolean dispMiv) {
		this.dispMiv = dispMiv;
	}

	public Boolean getDispFormulaMagistral() {
		return dispFormulaMagistral;
	}

	public OrdenacionesTipoFKTO getOrdenacionesTipoFKTO() {
		return ordenacionesTipoFKTO;
	}

	public Boolean getEnguia() {
		return enguia;
	}

	public Integer getIffracci() {
		return iffracci;
	}

	public Double getFcpvp() {
		return fcpvp;
	}

	public Double getFcpvl() {
		return fcpvl;
	}

	public String getTratamientoLote() {
		return tratamientoLote;
	}

	public IvaTipoFKTO getTipoIVAFKTO() {
		return tipoIVAFKTO;
	}

	public EspecialidadTipoFKTO getTipoEspecialidadFKTO() {
		return tipoEspecialidadFKTO;
	}

	public EnvaseTipoFKTO getTipoEnvaseFKTO() {
		return tipoEnvaseFKTO;
	}

	public Boolean getPermiteComprar() {
		return permiteComprar;
	}

	public Integer getPedidoMinimo() {
		return pedidoMinimo;
	}

	public String getNemonicoGestion() {
		return nemonicoGestion;
	}

	public String getFormaFarmaceutica() {
		if (this.formaFarmaceutica != null)
			return formaFarmaceutica;
		else if (this.formaFarmaceuticaUnidad != null)
			return this.formaFarmaceuticaUnidad.getDescripcion();
		else
			return null;
	}

	public StockUnidadFKTO getFactorSuministroUnidad() {
		return factorSuministroUnidad;
	}

	public Integer getFactorSuministro() {
		return factorSuministro;
	}

	public StockUnidadFKTO getFactorCompraUnidad() {
		return factorCompraUnidad;
	}

	public Integer getFactorCompra() {
		return factorCompra;
	}

	public Boolean getDispensar() {
		return dispensar;
	}

	public Double getDescuento2() {
		return descuento2;
	}

	public Double getDescuento() {
		return descuento;
	}

	public String getDescripcionGestion() {
		return descripcionGestion;
	}

	public CuentaContableFKTO getCuentaContableFKTO() {
		return cuentaContableFKTO;
	}

	public ClaveFKTO getClave5FKTO() {
		return clave5FKTO;
	}

	public ClaveFKTO getClave4FKTO() {
		return clave4FKTO;
	}

	public ClaveFKTO getClave3FKTO() {
		return clave3FKTO;
	}

	public ClaveFKTO getClave2FKTO() {
		return clave2FKTO;
	}

	public ClaveFKTO getClave1FKTO() {
		return clave1FKTO;
	}

	public String getAltidPres() {
		return altidPres;
	}

	public Boolean getDispPlanta() {
		return dispPlanta;
	}

	public String getLugarDispensacion() {
		return lugarDispensacion;
	}

	public ContenedorFKTO getContenedorFKTO() {
		return contenedorFKTO;
	}

	public FormaFarmaFKTO getFormaFarmaceuticaUnidad() {
		return formaFarmaceuticaUnidad;
	}

	public void setDispFormulaMagistral(Boolean dispFormulaMagistral) {
		this.dispFormulaMagistral = dispFormulaMagistral;
	}

	public void setOrdenacionesTipoFKTO(OrdenacionesTipoFKTO ordenacionesTipoFKTO) {
		this.ordenacionesTipoFKTO = ordenacionesTipoFKTO;
	}

	public void setEnguia(Boolean enguia) {
		this.enguia = enguia;
	}

	public void setIffracci(Integer iffracci) {
		this.iffracci = iffracci;
	}

	public void setFcpvp(Double fcpvp) {
		this.fcpvp = fcpvp;
	}

	public void setFcpvl(Double fcpvl) {
		this.fcpvl = fcpvl;
	}

	public void setTratamientoLote(String tratamientoLote) {
		this.tratamientoLote = tratamientoLote;
	}

	public void setTipoIVAFKTO(IvaTipoFKTO tipoIVAFKTO) {
		this.tipoIVAFKTO = tipoIVAFKTO;
	}

	public void setTipoEspecialidadFKTO(EspecialidadTipoFKTO tipoEspecialidadFKTO) {
		this.tipoEspecialidadFKTO = tipoEspecialidadFKTO;
	}

	public void setTipoEnvaseFKTO(EnvaseTipoFKTO tipoEnvaseFKTO) {
		this.tipoEnvaseFKTO = tipoEnvaseFKTO;
	}

	public void setPermiteComprar(Boolean permiteComprar) {
		this.permiteComprar = permiteComprar;
	}

	public void setPedidoMinimo(Integer pedidoMinimo) {
		this.pedidoMinimo = pedidoMinimo;
	}

	public void setNemonicoGestion(String nemonicoGestion) {
		this.nemonicoGestion = nemonicoGestion;
	}

	public void setFormaFarmaceutica(String formaFarmaceutica) {
		this.formaFarmaceutica = formaFarmaceutica;
	}

	public void setFactorSuministroUnidad(StockUnidadFKTO factorSuministroUnidad) {
		this.factorSuministroUnidad = factorSuministroUnidad;
	}

	public void setFactorSuministro(Integer factorSuministro) {
		this.factorSuministro = factorSuministro;
	}

	public void setFactorCompraUnidad(StockUnidadFKTO factorCompraUnidad) {
		this.factorCompraUnidad = factorCompraUnidad;
	}

	public void setFactorCompra(Integer factorCompra) {
		this.factorCompra = factorCompra;
	}

	public void setDispensar(Boolean dispensar) {
		this.dispensar = dispensar;
	}

	public void setDescuento2(Double descuento2) {
		this.descuento2 = descuento2;
	}

	public void setDescuento(Double descuento) {
		this.descuento = descuento;
	}

	public void setDescripcionGestion(String descripcionGestion) {
		this.descripcionGestion = descripcionGestion;
	}

	public void setCuentaContableFKTO(CuentaContableFKTO cuentaContableFKTO) {
		this.cuentaContableFKTO = cuentaContableFKTO;
	}

	public void setClave5FKTO(ClaveFKTO clave5FKTO) {
		this.clave5FKTO = clave5FKTO;
	}

	public void setClave4FKTO(ClaveFKTO clave4FKTO) {
		this.clave4FKTO = clave4FKTO;
	}

	public void setClave3FKTO(ClaveFKTO clave3FKTO) {
		this.clave3FKTO = clave3FKTO;
	}

	public void setClave2FKTO(ClaveFKTO clave2FKTO) {
		this.clave2FKTO = clave2FKTO;
	}

	public void setClave1FKTO(ClaveFKTO clave1FKTO) {
		this.clave1FKTO = clave1FKTO;
	}

	public void setAltidPres(String altidPres) {
		this.altidPres = altidPres;
	}

	public void setDispPlanta(Boolean dispPlanta) {
		this.dispPlanta = dispPlanta;
	}

	public String getReposicion() {
		return reposicion;
	}

	public void setReposicion(String reposicion) {
		this.reposicion = reposicion;
	}

	public String getCodigoFacturacion() {
		return codigoFacturacion;
	}

	public void setCodigoFacturacion(String codigoFacturacion) {
		this.codigoFacturacion = codigoFacturacion;
	}

	public Boolean getPermiteFabricar() {
		return permiteFabricar;
	}

	public void setPermiteFabricar(Boolean permiteFabricar) {
		this.permiteFabricar = permiteFabricar;
	}

	public Boolean getPermiteCompraCentralizada() {
		return permiteCompraCentralizada;
	}

	public void setPermiteCompraCentralizada(Boolean permiteCompraCentralizada) {
		this.permiteCompraCentralizada = permiteCompraCentralizada;
	}

	public void setLugarDispensacion(String lugarDispensacion) {
		this.lugarDispensacion = lugarDispensacion;
	}

	public void setContenedorFKTO(ContenedorFKTO contenedorFKTO) {
		this.contenedorFKTO = contenedorFKTO;
	}

	public void setFormaFarmaceuticaUnidad(FormaFarmaFKTO formaFarmaceuticaUnidad) {
		this.formaFarmaceuticaUnidad = formaFarmaceuticaUnidad;
	}

//	public String getCodinaciMedicaTraspaso() {
//		return codinaciMedicaTraspaso;
//	}
//
//	public void setCodinaciMedicaTraspaso(String codinaciMedicaTraspaso) {
//		this.codinaciMedicaTraspaso = codinaciMedicaTraspaso;
//	}
//
//	public String getDescripGestionMedicaTraspaso() {
//		return descripGestionMedicaTraspaso;
//	}
//
//	public void setDescripGestionMedicaTraspaso(String descripGestionMedicaTraspaso) {
//		this.descripGestionMedicaTraspaso = descripGestionMedicaTraspaso;
//	}

	public String getTraspasadaDesde() {
		return traspasadaDesde;
	}

	public void setTraspasadaDesde(String traspasadaDesde) {
		this.traspasadaDesde = traspasadaDesde;
	}

	public Boolean getLanzarTraspaso() {
		return lanzarTraspaso;
	}

	public void setLanzarTraspaso(Boolean lanzarTraspaso) {
		this.lanzarTraspaso = lanzarTraspaso;
	}

	public Boolean getDispirmp() {
		return dispirmp;
	}

	public void setDispirmp(Boolean dispirmp) {
		this.dispirmp = dispirmp;
	}

	/**
	 * LOPD
	 */
	public String printLopd() {
		PipedBuffer linea = new PipedBuffer();

		linea.append(this.id);
		linea.append(this.codinaci);
		linea.append(this.descripcion);
		linea.append(this.nemonico);
		linea.append(this.descripcionGestion);
		linea.append(this.nemonicoGestion);
		linea.append(this.activo);
		linea.append(this.ensaclin);
		linea.append(this.extranje);
		linea.append(this.multidos);
		linea.append(this.generico != null ? this.generico.getId() : Long.valueOf(0l));
		linea.append(this.duracion);
		linea.append(this.altidPres);
		linea.append(this.altidGestion);
		linea.append(this.ean13compra);
		linea.append(this.ean13suministro);
		linea.append(this.factorCompra);
		linea.append(this.factorCompraUnidad.getCodigo());
		linea.append(this.factorSuministro);
		linea.append(this.factorSuministroUnidad.getCodigo());
		linea.append(this.gestionarPedidosPor);
		linea.append(this.fraccionIngreso);
		linea.append(this.fraccionAmbulatorio);
		linea.append(this.proveedor != null ? this.proveedor.getId() : Long.valueOf(0l));
		linea.append(this.finaliza);
		linea.append(this.compartibleEnCarro);
		linea.append(this.dispensar);
		linea.append(this.dispMiv);
		linea.append(this.dispFormulaMagistral);
		linea.append(this.getOrdenacionesTipoFKTO() != null ? this.getOrdenacionesTipoFKTO().getDescripcion() : "");
		linea.append(this.getIdUsuario());
		linea.append(this.getFechaProceso());
		linea.append(this.getContenedorFKTO() != null ? this.getContenedorFKTO().getDescripcion() : "");

		return linea.toString();
	}

	/**
	 * Retorna los indices a nivel de base de datos de la tabla en un ArrayList.<BR>
	 * El orden de devolución ha de ser el mismo que posteriormente, se use para instanciar los parametros de una
	 * sentencia SQL. El orden también es importante debido a que se utiliza en MaestroBrowser.jsp<BR>
	 * En los indices de tipo BD no se acepta la coma; sino daria problemas con MaestroBrowser.jsp
	 */
	public ArrayList getIdBD() {
		ArrayList ret = new ArrayList();
		ret.add(this.getId());
		return ret;
	}

	/**
	 * Retorna los indices a nivel de la aplicación Silicon de esta tabla en un ArrayList.<BR>
	 * El orden de devolución ha de ser el mismo que posteriormente, se use para instanciar los parametros de una
	 * sentencia SQL.
	 */
	public ArrayList<String> getIdEntidad() {
		ArrayList<String> ret = new ArrayList<String>();
		ret.add(this.getCodinaci());
		return ret;
	}

	public boolean isPestanyaExcipientesActiva() {
		return pestanyaExcipientesActiva;
	}

	public void setPestanyaExcipientesActiva(boolean pestanyaExcipientesActiva) {
		this.pestanyaExcipientesActiva = pestanyaExcipientesActiva;
	}

	public boolean isPestanyaAlmacenActiva() {
		return pestanyaAlmacenActiva;
	}

	public void setPestanyaAlmacenActiva(boolean pestanyaAlmacenActiva) {
		this.pestanyaAlmacenActiva = pestanyaAlmacenActiva;
	}

	public boolean isPestanyaStockActiva() {
		return pestanyaStockActiva;
	}

	public void setPestanyaStockActiva(boolean pestanyaStockActiva) {
		this.pestanyaStockActiva = pestanyaStockActiva;
	}

	public boolean isPestanyaMovimientosActiva() {
		return pestanyaMovimientosActiva;
	}

	public void setPestanyaMovimientosActiva(boolean pestanyaMovimientosActiva) {
		this.pestanyaMovimientosActiva = pestanyaMovimientosActiva;
	}

	public boolean isPestanyaAnyoActiva() {
		return pestanyaAnyoActiva;
	}

	public void setPestanyaAnyoActiva(boolean pestanyaAnyoActiva) {
		this.pestanyaAnyoActiva = pestanyaAnyoActiva;
	}

	public boolean isPestanyaPrescripcionActiva() {
		return pestanyaPrescripcionActiva;
	}

	public void setPestanyaPrescripcionActiva(boolean pestanyaPrescripcionActiva) {
		this.pestanyaPrescripcionActiva = pestanyaPrescripcionActiva;
	}

	public boolean isPestanyaInfantilActiva() {
		return pestanyaInfantilActiva;
	}

	public void setPestanyaInfantilActiva(boolean pestanyaInfantilActiva) {
		this.pestanyaInfantilActiva = pestanyaInfantilActiva;
	}

	public boolean isPestanyaGestionActiva() {
		return pestanyaGestionActiva;
	}

	public void setPestanyaGestionActiva(boolean pestanyaGestionActiva) {
		this.pestanyaGestionActiva = pestanyaGestionActiva;
	}

	/**
	 * @return the idCatalogoAL
	 */
	public ArrayList<Long> getIdCatalogoAL() {
		return idCatalogoAL;
	}

	/**
	 * @param idCatalogoAL
	 *            the idCatalogoAL to set
	 */
	public void setIdCatalogoAL(ArrayList<Long> idCatalogoAL) {
		this.idCatalogoAL = idCatalogoAL;
	}

	public FCTO getEspecialidadTraspaso() {
		return especialidadTraspaso;
	}

	public void setEspecialidadTraspaso(FCTO especialidadTraspaso) {
		this.especialidadTraspaso = especialidadTraspaso;
	}

	public Boolean getVerificarDispAmb() {
		return verificarDispAmb;
	}

	public void setVerificarDispAmb(Boolean verificarDispAmb) {
		this.verificarDispAmb = verificarDispAmb;
	}
}
