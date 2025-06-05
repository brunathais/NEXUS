
package com.ska.NEXUS.service;

import com.ska.NEXUS.dto.TransacoesDTO;
import com.ska.NEXUS.model.TransacoesModel;
import com.ska.NEXUS.repository.TransacoesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransacoesService {

    @Autowired
    private TransacoesRepository repository;

    public TransacoesModel salvar(TransacoesDTO dto) {
        TransacoesModel transacao = new TransacoesModel();
        transacao.setTipo(dto.getTipo());
        transacao.setValor(dto.getValor());
        transacao.setData(dto.getData());
        transacao.setDescricao(dto.getDescricao());
        transacao.setCategoria(dto.getCategoria());

        return repository.save(transacao);
    }

    public List<TransacoesModel> listarTodas() {
        return repository.findAll();
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    public TransacoesModel editar(Long id, TransacoesDTO dto) {
        TransacoesModel transacao = repository.findById(id).orElseThrow();
        transacao.setTipo(dto.getTipo());
        transacao.setValor(dto.getValor());
        transacao.setData(dto.getData());
        transacao.setDescricao(dto.getDescricao());
        transacao.setCategoria(dto.getCategoria());

        return repository.save(transacao);
    }
    
}

