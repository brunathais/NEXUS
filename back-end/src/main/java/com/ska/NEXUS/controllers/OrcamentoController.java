package controller;

import model.Orcamento;
import service.OrcamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orcamentos")
@CrossOrigin(origins = "*")
public class OrcamentoController {

    @Autowired
    private OrcamentoService orcamentoService;

    @PostMapping
    public Orcamento criar(@RequestBody Orcamento orcamento) {
        return orcamentoService.salvar(orcamento);
    }

    @GetMapping
    public List<Orcamento> listar() {
        return orcamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Orcamento> buscar(@PathVariable Long id) {
        return orcamentoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Orcamento atualizar(@PathVariable Long id, @RequestBody Orcamento novo) {
        return orcamentoService.buscarPorId(id)
            .map(orcamento -> {
                orcamento.setEssenciais(novo.getEssenciais());
                orcamento.setNaoEssenciais(novo.getNaoEssenciais());
                orcamento.setImprevistos(novo.getImprevistos());
                orcamento.setReservaEmergencia(novo.getReservaEmergencia());
                return orcamentoService.salvar(orcamento);
            })
            .orElseGet(() -> {
                novo.setId(id);
                return orcamentoService.salvar(novo);
            });
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        orcamentoService.deletar(id);
    }
}
